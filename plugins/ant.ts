import Ant from 'ant-design-vue'
export default defineNuxtPlugin(nuxtApp => {
  // now available on `nuxtApp.$injected`
  nuxtApp.vueApp.use(Ant)
})
