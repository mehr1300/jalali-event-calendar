import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jalali-event-calendar/',
  build: {
    lib: {
      entry: 'src/lib/index.js',
      name: 'PersianCalendar',
      fileName: (format) => `jalali-event-calendar.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
