export default defineEventHandler(async function (event) {
	const runtimeConfig = useRuntimeConfig()

	const response = await $fetch(runtimeConfig.baseUrl, {
		params: {
			key: runtimeConfig.apiKey,
			ordering: 'released'
		}
	})
	
	return response
})