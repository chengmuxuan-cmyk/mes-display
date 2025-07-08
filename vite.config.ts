import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path' // 引入 path 模块
import copy from 'rollup-plugin-copy'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
      vue(), vueJsx(),
      copy({
        targets: [
          {src: 'node_modules/@baidumap/mapv-three/dist/assets', dest: 'public/mapvthree'},
        ],
        verbose: true,  //  vite需要加这个参数
        hook: 'buildStart', // vite需要加这个参数
      }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // 将 @ 指向 src 目录
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/modbus': {
        target: 'http://192.168.120.66:8081', // 目标服务器地址
        changeOrigin: true, // 是否改变源
        // rewrite: (path) => path.replace(/^\/modbus/, '') // 路径重写
      }
    }
  }
})
