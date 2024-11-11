import fs from 'fs/promises';

const outputToFile = async (filename: string, content: string): Promise<void> => {
  try {
    await fs.writeFile(filename, content, 'utf8');
    console.log(`Successfully wrote to ${filename}`);
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
  }
};

const readmeContent = `# Bun Image Hosting Service

This is a simple image hosting service developed using Bun and the Hono framework. It allows users to upload images and provides URLs for accessing them.

## Features

- High performance using the Bun runtime
- Lightweight and easily extensible, based on the Hono framework
- Supports image uploads and static file serving
- Simple API authentication using Bearer Token
- CORS support for cross-origin requests

## Installation

1. Ensure you have Bun installed. If not, visit the [Bun website](https://bun.sh/) for installation instructions.

2. Clone this repository:

   \`\`\`bash
   git clone https://your-repository-url.git
   cd bun-image-server
   \`\`\`

3. Install dependencies:

   \`\`\`bash
   bun install
   \`\`\`

## Configuration

1. Create a \`.env\` file in the project root directory with the following content:

   \`\`\`
   UPLOAD_KEY=your-secret-key
   PORT=3000
   \`\`\`

   Replace \`your-secret-key\` with your own secret key.

2. If needed, you can modify the \`config\` object in the \`src/index.ts\` file to change default configurations.

## Running

Start the server:

\`\`\`bash
bun run src/index.ts
\`\`\`

The server will run at \`http://localhost:3000\` (unless you specified a different port in the \`.env\` file).

## API Usage

### Upload Image

- **URL**: \`/upload\`
- **Method**: POST
- **Authentication**: Bearer Token
- **Request Body**: multipart/form-data
  - \`image\`: Image file

#### Example Request

Using curl:

\`\`\`bash
curl -X POST -H "Authorization: Bearer your-secret-key" -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload
\`\`\`

#### Response

On success:

\`\`\`json
{
  "success": true,
  "url": "http://localhost:3000/uploads/1234567890.jpg",
  "filename": "1234567890.jpg"
}
\`\`\`

### Accessing Images

After successful upload, images can be accessed directly via the returned URL.

## Security Considerations

- Ensure a strong key is used as the \`UPLOAD_KEY\` in production environments.
- Consider implementing more complex authentication mechanisms, especially for public deployments.
- It's advisable to limit the size and types of files that can be uploaded.
- Configure HTTPS in production environments.

## Contributing

Issues and pull requests are welcome to improve this project.

## License

[MIT License](LICENSE)
`;

const readmeCNContent = `# Bun 图床服务

这是一个基于 Bun 和 Hono 框架开发的简单图床服务。它允许用户上传图片，并提供图片的 URL 以便访问。

## 功能特点

- 使用 Bun 运行时，性能优异
- 基于 Hono 框架，轻量级且易于扩展
- 支持图片上传和静态文件服务
- 使用 Bearer Token 进行简单的 API 认证
- 支持 CORS，便于跨域请求

## 安装

1. 确保你已经安装了 Bun。如果没有，请访问 [Bun 官网](https://bun.sh/) 进行安装。

2. 克隆此仓库：

   \`\`\`bash
   git clone https://your-repository-url.git
   cd bun-image-server
   \`\`\`

3. 安装依赖：

   \`\`\`bash
   bun install
   \`\`\`

## 配置

1. 在项目根目录创建一个 \`.env\` 文件，添加以下内容：

   \`\`\`
   UPLOAD_KEY=your-secret-key
   PORT=3000
   \`\`\`

   将 \`your-secret-key\` 替换为你自己的密钥。

2. 如果需要，你可以在 \`src/index.ts\` 文件中修改 \`config\` 对象来更改默认配置。

## 运行

启动服务器：

\`\`\`bash
bun run src/index.ts
\`\`\`

服务器将在 \`http://localhost:3000\` 运行（除非你在 \`.env\` 文件中指定了其他端口）。

## API 使用

### 上传图片

- **URL**: \`/upload\`
- **方法**: POST
- **认证**: Bearer Token
- **请求体**: multipart/form-data
  - \`image\`: 图片文件

#### 示例请求

使用 curl：

\`\`\`bash
curl -X POST -H "Authorization: Bearer your-secret-key" -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload
\`\`\`

#### 响应

成功时：

\`\`\`json
{
  "success": true,
  "url": "http://localhost:3000/uploads/1234567890.jpg",
  "filename": "1234567890.jpg"
}
\`\`\`

### 访问图片

上传成功后，可以通过返回的 URL 直接访问图片。

## 安全注意事项

- 在生产环境中，请确保使用强密钥作为 \`UPLOAD_KEY\`。
- 考虑实现更复杂的认证机制，特别是在公开部署时。
- 建议限制上传文件的大小和类型。
- 在生产环境中，应该配置 HTTPS。

## 贡献

欢迎提交 issues 和 pull requests 来改进这个项目。

## 许可

[MIT License](LICENSE)
`;

const main = async () => {
  try {
    await outputToFile('README.md', readmeContent);
    await outputToFile('README_CN.md', readmeCNContent);
    console.log('All files have been created successfully.');
  } catch (error) {
    console.error('An error occurred during file creation:', error);
  }
};

main();