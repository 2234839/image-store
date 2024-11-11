# Bun Image Hosting Service

This is a simple image hosting service developed using Bun and the Hono framework. It allows users to upload images and provides URLs for accessing them.

[中文版](README_CN.md)

## Features

- High performance using the Bun runtime
- Lightweight and easily extensible, based on the Hono framework
- Supports image uploads and static file serving
- Simple API authentication using Bearer Token
- CORS support for cross-origin requests

## Installation

### Using Source Code

1. Ensure you have Bun installed. If not, visit the [Bun website](https://bun.sh/) for installation instructions.

2. Clone this repository:

   ```bash
   git clone https://github.com/2234839/image-store.git
   cd bun-image-server
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

### Using Binary

You can also download the pre-compiled binary for your platform from the [Releases](https://github.com/2234839/image-store/releases) page.

1. Download the appropriate binary for your system (Linux or Windows).
2. Make the file executable (Linux only):
   ```bash
   chmod +x ./image-store-linux
   ```
3. Run the binary:
   - Linux: `./image-store-linux`
   - Windows: Double-click `image-store-windows.exe` or run it from the command line

## Configuration

1. Create a `.env` file in the project root directory with the following content:

   ```
   UPLOAD_KEY=your-secret-key
   PORT=3000
   ```

   Replace `your-secret-key` with your own secret key.

2. If needed, you can modify the `config` object in the `src/index.ts` file to change default configurations.

## Running

Start the server:

```bash
bun run src/index.ts
```

The server will run at `http://localhost:3000` (unless you specified a different port in the `.env` file).

## API Usage

### Upload Image

- **URL**: `/upload`
- **Method**: POST
- **Authentication**: Bearer Token
- **Request Body**: multipart/form-data
  - `image`: Image file

#### Example Request

Using curl:

```bash
curl -X POST -H "Authorization: Bearer your-secret-key" -F "image=@/path/to/your/image.jpg" http://localhost:3000/upload
```

#### Response

On success:

```json
{
  "success": true,
  "url": "http://localhost:3000/uploads/1234567890.jpg",
  "filename": "1234567890.jpg"
}
```

### Accessing Images

After successful upload, images can be accessed directly via the returned URL.

## Security Considerations

- Ensure a strong key is used as the `UPLOAD_KEY` in production environments.
- Consider implementing more complex authentication mechanisms, especially for public deployments.
- It's advisable to limit the size and types of files that can be uploaded.
- Configure HTTPS in production environments.

## Contributing

Issues and pull requests are welcome to improve this project.

## License

[MIT License](LICENSE)
