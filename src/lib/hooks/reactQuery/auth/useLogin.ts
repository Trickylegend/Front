import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useLogin(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['login'],
		apiCall: (data: FormData | any) =>
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
