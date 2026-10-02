import { defineConfig, transformWithEsbuild } from 'vite'
import react from '@vitejs/plugin-react'

const jsxInJavaScript = {
  name: 'jsx-in-javascript',
  enforce: 'pre',
  async transform(code, id) {
    if (!/[\\/]src[\\/].*\.js$/.test(id)) return null
    return transformWithEsbuild(code, id, { loader: 'jsx', jsx: 'automatic' })
  },
}

export default defineConfig({
  plugins: [jsxInJavaScript, react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
})
