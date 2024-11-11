import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { bearerAuth } from 'hono/bearer-auth'
import { cors } from 'hono/cors'
import { join } from 'path'
import { mkdir, writeFile } from 'fs/promises'

const app = new Hono()

// 配置
const config = {
  uploadKey: process.env.UPLOAD_KEY || 'your-secret-key',
  port: parseInt(process.env.PORT || '3000'),
  uploadDir: './uploads'
}

// CORS middleware
app.use('*', cors({
  origin: '*', // 允许所有来源，您可能想要限制这个在生产环境中
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))

// 认证中间件
const authMiddleware = bearerAuth({ token: config.uploadKey })

// 确保上传目录存在
async function ensureUploadDir() {
  try {
    await mkdir(config.uploadDir, { recursive: true })
  } catch (error) {
    console.error('Failed to create upload directory:', error)
  }
}

// 静态文件服务
app.use('/uploads/*', serveStatic({ root: './' }))

// 上传端点
app.post('/upload', authMiddleware, async (c) => {
  try {
    const body = await c.req.parseBody()
    const file = body['image']

    if (!file || !(file instanceof Blob)) {
      return c.json({ error: 'No file uploaded' }, 400)
    }

    // 生成文件名
    const ext = file.name?.split('.').pop() || 'jpg'
    const filename = `${Date.now()}.${ext}`
    const filepath = join(config.uploadDir, filename)

    // 保存文件
    const arrayBuffer = await file.arrayBuffer()
    await writeFile(filepath, new Uint8Array(arrayBuffer))

    // 返回文件URL
    const protocol = c.req.header('X-Forwarded-Proto') || 'http'
    const host = c.req.header('Host') || `localhost:${config.port}`
    const url = `${protocol}://${host}/uploads/${filename}`

    return c.json({
      success: true,
      url,
      filename
    })
  } catch (error) {
    console.error('Upload error:', error)
    return c.json({ error: 'Upload failed' }, 500)
  }
})

// 健康检查端点
app.get('/health', (c) => c.json({ status: 'ok' }))

// 启动服务器
ensureUploadDir().then(() => {
  console.log(`Server running at http://localhost:${config.port}`)
})

export default {
  port: config.port,
  fetch: app.fetch
}