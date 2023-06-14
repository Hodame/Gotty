// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxthq/ui', '@nuxtjs/tailwindcss', '@vueuse/nuxt', 'nuxt-swiper', '@vee-validate/nuxt', 'nuxt-vuefire',],
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
      baseUrl: 'https://api.rawg.io/api/games',
      apiKey: 'e0bd00b887d44e569f95cce1824ffd92',
    }
  },
  vuefire: {
    config: {
      apiKey: 'AIzaSyD9JEQP4IYMpeYpfAokvVgrO_wohMn8J68',
      authDomain: 'gotty-collection.firebaseapp.com',
      projectId: 'gotty-collection',
      appId: '1:817082315621:web:e337de8620bfff05cb278c',
      storageBucket: 'gs://gotty-collection.appspot.com'
    },
    auth: true,
    admin: { serviceAccount: 'gotty-collection-firebase-adminsdk-onvsq-b15b20e9d7.json' },
  },
  ui: {
    icons: ['fluent', 'heroicons', 'bi']
  }
})
