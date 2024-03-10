import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

const apiBaseUrl = 'http://localhost:8089';


export default defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    define: {
      global: 'globalThis',
    },
    server: {
      host: '0.0.0.0',
      port: 5174, 

      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace('/api', ''),
        }
      }    
    },
})
