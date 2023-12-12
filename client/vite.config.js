import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    // depending on your application, base can also be "/"
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    define: {
      // here is the main update
      global: 'globalThis',
    },
    server: {
      host: '0.0.0.0',
      port: 3000, 

      proxy: {
        '/api': {
          target: "http://192.168.50.20:3003",
          changeOrigin: true,
          secure: false,
          // We can even re-write the request
          rewrite: path => path.replace('/api', ''),
        }
      }    
        // this ensures that the browser opens upon server start
        // this sets a default port to 3000  
    },
})