import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export interface RegistrationPayload {
	name: string
	email: string
	password: string
}

export default function useRegistration() {
	return useCustomMutation<RegistrationPayload, any, any>({
		mutationKey: ['registration'],
		apiCall: (data: RegistrationPayload) =>
			axios
				.post('/registration', data)
				.then((response: AxiosResponse) => response.data),
	})
}
