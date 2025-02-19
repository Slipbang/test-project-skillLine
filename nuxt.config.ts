import {defineNuxtConfig} from "nuxt/config";
import svgLoader from "vite-svg-loader";


export default defineNuxtConfig({
  css: ['./assets/main.scss'],
  modules: ['@pinia/nuxt'],
  compatibilityDate: '2025-02-19',
  vite: {
    plugins: [
      svgLoader(),
    ],
  },
})