import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
   server: {
    port: 5176, // paksa port tetap
    strictPort: true // kalau 5173 dipakai, error daripada auto ganti
  }
=======
>>>>>>> 9174e73c7b90fea1cee9202e391ab25ca898df62
})
