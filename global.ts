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

export type Review = {
	id: string
	gameId: string,
	rating: number
	likes: number 
	content: string
	user: {
		avatar: string 
		nickname: string
	}
}