import axios from 'axios'

function getCookie(name) {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
	return match ? match[2] : null
}

const axis = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

axis.interceptors.request.use(
	config => {
		const token = getCookie('accessToken')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// axis.interceptors.response.use(
// 	response => response,
// 	async error => {
// 		const originalRequest = error.config
// 		if (
// 			(error.response?.status === 403 || error.response?.status === 401) &&
// 			!originalRequest._retry
// 		) {
// 			originalRequest._retry = true // Пометка, что запрос повторяется
// 			try {
// 				const { data } = await axis.get('/token')
// 				const newAccessToken = data.accessToken
// 				localStorage.setItem('accessToken', newAccessToken)
// 				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
// 				return axis(originalRequest)
// 			} catch (refreshError) {
// 				console.error('Не удалось обновить токен:', refreshError)
// 				return Promise.reject(refreshError)
// 			}
// 		}
// 		return Promise.reject(error)
// 	}
// )

export default axis
