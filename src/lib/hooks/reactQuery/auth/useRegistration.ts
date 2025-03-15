import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export interface RegistrationPayload {
	name: string
	email: string
	password: string
}

export default function useRegistration(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation<RegistrationPayload, any, any>({
		mutationKey: ['registration'],
		apiCall: (data: RegistrationPayload) =>
			axios
				.post('/registration', data, {
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
