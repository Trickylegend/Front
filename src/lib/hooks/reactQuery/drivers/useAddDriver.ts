import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useAddDriver(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['AddDriver'],
		apiCall: (data: FormData | any) =>
			axios
				.post('/drivers', data, {
					headers: {
						'Content-Type':
							contentType === 'multipart/form-data'
								? 'multipart/form-data'
								: 'application/json',
					},
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'drivers',
	})
}
