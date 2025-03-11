import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export interface LoginPayload {
	email: string
	password: string
}

export default function useLogin() {
	return useCustomMutation<LoginPayload, any, any>({
		mutationKey: ['login'],
		apiCall: (data: LoginPayload) =>
			axios
				.post('/login', data)
				.then((response: AxiosResponse) => response.data),
	})
}
