import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: '/',  // Important for Heroku deployment
  build: {
    outDir: 'dist'  // Ensure this matches your start script
  }
})