# Bun 图床服务

这是一个基于 Bun 和 Hono 框架开发的简单图床服务。它允许用户上传图片，并提供图片的 URL 以便访问。

[English Version](README.md)

## 功能特点

- 使用 Bun 运行时，性能优异
- 基于 Hono 框架，轻量级且易于扩展
- 支持图片上传和静态文件服务
- 使用 Bearer Token 进行简单的 API 认证
- 支持 CORS，便于跨域请求

## 安装

### 使用源代码

1. 确保你已经安装了 Bun。如果没有，请访问 [Bun 官网](https://bun.sh/) 进行安装。

2. 克隆此仓库：

   ```bash
   git clone https://github.com/2234839/image-store.git
   cd bun-image-server
   ```

3. 安装依赖：

   ```bash
   bun install
   ```

### 使用二进制文件

你也可以从 [Releases](https://github.com/2234839/image-store/releases) 页面下载预编译的二进制文件。

1. 下载适合你系统的二进制文件（Linux 或 Windows）。
2. 使文件可执行（仅限 Linux）：
   ```bash
   chmod +x ./image-store-linux
   ```
3. 运行二进制文件：
   - Linux: `./image-store-linux`
   - Windows: 双击 `image-store-windows.exe` 或从命令行运行

## 配置

1. 在项目根目录创建一个 `.env` 文件，添加以下内容：

   ```
   UPLOAD_KEY=your-secret-key
   PORT=3000
   ```

   将 `your-secret-key` 替换为你自己的密钥。

2. 如果需要，你可以在 `src/index.ts` 文件中修改 `config` 对象来更改默认配置。

## 运行

启动服务器：

```bash
bun run src/index.ts
```

服务器将在 `http://localhost:3000` 运行（除非你在 `.env` 文件中指定了其他端口）。

## API 使用

### 上传图片

- **URL**: `/upload`
- **方法**: POST
- **认证**: Bearer Token
- **请求体**: multipart/form-data
  - `image`: 图片文件

#### 示例请求

使用 curl：

```bash
curl -X POST -H "Authorization: Bearer your-secret-key" -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload
```

#### 响应

成功时：

```json
{
  "success": true,
  "url": "http://localhost:3000/uploads/1234567890.jpg",
  "filename": "1234567890.jpg"
}
```

### 访问图片

上传成功后，可以通过返回的 URL 直接访问图片。

## 安全注意事项

- 在生产环境中，请确保使用强密钥作为 `UPLOAD_KEY`。
- 考虑实现更复杂的认证机制，特别是在公开部署时。
- 建议限制上传文件的大小和类型。
- 在生产环境中，应该配置 HTTPS。

## 贡献

欢迎提交 issues 和 pull requests 来改进这个项目。

## 许可

[MIT License](LICENSE)
