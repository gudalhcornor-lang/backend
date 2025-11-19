import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
   server: {
<<<<<<< HEAD
    port: 5174, // paksa port tetap
=======
    port: 5176, // paksa port tetap
>>>>>>> 0198c2a1139c0142112f61a9fe977b47634f74a2
    strictPort: true // kalau 5173 dipakai, error daripada auto ganti
  }
=======
>>>>>>> 9174e73c7b90fea1cee9202e391ab25ca898df62
})
