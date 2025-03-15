// src/lib/hooks/reactQuery/users/useEditUser.ts
import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useEditUser(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['EditUser'],
		apiCall: (data: FormData | any) =>
			axios
				.put(`/users/${data.id}`, data, {
					headers: {
						'Content-Type':
							contentType === 'multipart/form-data'
								? 'multipart/form-data'
								: 'application/json',
					},
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'users',
	})
}
