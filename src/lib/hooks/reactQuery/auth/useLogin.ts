import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export interface LoginPayload {
	email: string
	password: string
}

export default function useLogin(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation<LoginPayload, any, any>({
		mutationKey: ['login'],
		apiCall: (data: LoginPayload) =>
			axios
				.post('/login', data, {
					headers: {
						'Content-Type':
							contentType === 'multipart/form-data'
								? 'multipart/form-data'
								: 'application/json',
					},
				})
				.then((response: AxiosResponse) => response.data),
	})
}
