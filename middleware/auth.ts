
export default defineNuxtRouteMiddleware(async function (to) {
	const user = await getCurrentUser()
		if(!user) {			
			return navigateTo('/')
		}
})