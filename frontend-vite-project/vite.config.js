import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 4000,
    open: true,
    proxy: {
      '/api0': {
        // target: "http://10.199.93.5:5000",
        // target: "http://192.168.250.109:5000",
        target: "http://192.168.65.109:5000",
        changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，
        // 并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        rewrite: (path) => path.replace(/^\/api0/, '') // 不可以省略rewrite
      },
      '/api1': {
        // target: "http://10.199.240.160:5000",
        // target: "http://192.168.250.184:5000",
        target: "http://192.168.65.184:5000",
        changeOrigin: true, // 
        rewrite: (path) => path.replace(/^\/api1/, '') // 不可以省略rewrite
      },
    }
  }
})
