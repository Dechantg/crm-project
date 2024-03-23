                                        
import { defineConfig } from 'vite';
// import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const apiBaseUrl = 'http://localhost:8089';

// const sslCertificatePath  = './certificate.crt';
// const sslKeyPath = './private.key';


export default defineConfig({
    base: '',
    plugins: [react(), viteTsconfigPaths()],
    server: {
      port: 5174,
      host: '0.0.0.0',
      // https: {
        // key: sslKeyPath,
        // cert: sslCertificatePath,
      // },
  
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


