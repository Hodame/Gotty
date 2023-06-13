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

export const useReload = () => useState('reloader', function() {
	const reload = false

	return reload
})