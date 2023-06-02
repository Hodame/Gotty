import { useDateFormat, useNow } from "#imports";

export default defineEventHandler( async function(event) {
	const runtimeConfig = useRuntimeConfig()
	const from = useDateFormat(new Date(new Date().setMonth(new Date().getMonth() - 1)), 'YYYY-MM-DD')
	const to = useDateFormat(useNow(), 'YYYY-MM-DD')
	
	const response = await $fetch(runtimeConfig.baseUrl, {
		params: {
			key: runtimeConfig.apiKey,
			ordering: 'rating',
			dates: from.value + ',' + to.value,
		}
	})

	return response
})
