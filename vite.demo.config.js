import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    base: '/jalali-event-calendar/', // نام مخزن گیت‌هاب شما
    plugins: [react() ],
})
