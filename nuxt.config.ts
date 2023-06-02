// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthq/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-swiper', '@nuxtjs/supabase', '@vee-validate/nuxt',],
  veeValidate: {
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  runtimeConfig: {
    baseUrl: 'https://api.rawg.io/api/games',
    apiKey: 'e0bd00b887d44e569f95cce1824ffd92'
  },
  ui: {
    icons: ['fluent', 'heroicons']
  }
})
