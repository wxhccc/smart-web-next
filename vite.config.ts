import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import ViteComponents from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5678
  },
  plugins: [vue(),
    ViteComponents({
      resolvers: [AntDesignVueResolver({ resolveIcons: true })]
    }),
    svgLoader({
      defaultImport: 'url',
      svgoConfig: {
        plugins: [
          { name: 'removeViewBox', active: false },
          'removeDimensions',
          {
            name: 'removeAttrs',
            params: {
              attrs: 'path:fill.*'
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/styles/variables.scss';@import '@/styles/mixin.scss';`
      }
    }
  }
})
