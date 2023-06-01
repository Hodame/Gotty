import * as yup from "yup";

export default defineNuxtPlugin((nuxtapp) => { 
  return {
    provide: {
      yup: yup
    }
  }
})