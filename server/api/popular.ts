export default defineEventHandler( async function(event) {
	const runtimeConfig = useRuntimeConfig()
	console.log(runtimeConfig.apiKey);
	
	const response = await $fetch(runtimeConfig.baseUrl, {
		params: {
			key: runtimeConfig.apiKey,
			ordering: 'released'
		}
	})
	

	return response
})
