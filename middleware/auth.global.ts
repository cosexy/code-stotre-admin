export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (authStore.user && to.name === 'index') {
    return navigateTo('/overview')
  } else if (!authStore.user && to.name !== 'index') {
    return navigateTo('/')
  }
})
