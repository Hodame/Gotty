export type PagableList<T> = {
	count: number,
	next: string,
	previous: string,
	results: T[]
}

export type GameResultInfo = {
	id: string
	background_image: string
	name: string
	metacritic: string
}

export type ShortScreens = {
	id: string 
	image: string
}

export type AddedByStatus = {
}

export type EsrbRating = {
	id:   number;
	slug: string;
	name: string;
}

export type Platform = {
	platform:     AddedByStatus;
	released_at:  string;
	requirements: AddedByStatus;
}