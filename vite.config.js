import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [],
    root: 'app',
    build: {
      minify: false,
      outDir: "../build",
      commonjsOptions: {
      }
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      strictPort: true,
      hmr: {
        clientPort: 443 // Run the websocket server on the SSL port
      }
    }
  };
})
