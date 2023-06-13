
export function useReload() {
	const isReload = ref(false)

	const set = (value: boolean) => isReload.value = value 
	const get = () => (isReload.value)

	return (() => {set, get})
}