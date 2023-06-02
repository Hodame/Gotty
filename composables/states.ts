import { GameCardInfo, PageableList } from "~/global";
import type { User } from "~/types/user";

export const useUser = () => useState('user', function () {
	const user: User = {
		email: '',
		user_metadata: {
			nickname: '',
			avatar: ''
		},
		id: "",
		app_metadata: {

		},
		aud: "",
		created_at: ""
	}

	return user
})

export const useGamesPopular = () => useState('gamePopular', function () {
	const gamePopular: PageableList<GameCardInfo> = {
		count: 0,
		next: "",
		previus: "",
		results: []
	}

	return gamePopular
})

export const useGamesLatest = () => useState('gameLatest', function () {
	const gameLatest: PageableList<GameCardInfo> = {
		count: 0,
		next: "",
		previus: "",
		results: []
	}

	return gameLatest
})
