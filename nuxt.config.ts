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
    public: {
      baseUrl: '',
      apiKey: '',
    }
  },
  ui: {
    icons: ['fluent', 'heroicons']
  }
})
