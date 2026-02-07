import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            strategies: 'injectManifest',
            srcDir: 'src',
            filename: 'sw.js',
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            devOptions: {
                enabled: true,
                type: 'module'
            },
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', 'icon.svg'],
            manifest: {
                name: 'Naam Japa Counter',
                short_name: 'JapaCounter',
                description: 'A beautiful and minimalist Naam Japa Counter for your spiritual journey.',
                theme_color: '#E91E63',
                background_color: '#ffffff',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                orientation: 'portrait',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any'
                    },
                    {
                        src: 'icon.svg',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'maskable'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    server: {
        port: 3000,
        open: true
    },
    build: {
        outDir: 'build',
        sourcemap: true
    }
})
