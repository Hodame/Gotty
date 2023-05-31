export type PageableList<T> = {
	count: number
	next: string
	previus: string 
	results: T[]
}

export type GameCardInfo = {
	name: string
	background_image: string
}