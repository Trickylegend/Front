import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { Category } from '@/lib/types/category'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useAddCategory(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['AddCategory'],
		apiCall: (data: Category) =>
			axios
				.post('/categories', data, {
					headers: {
						'Content-Type':
							contentType === 'multipart/form-data'
								? 'multipart/form-data'
								: 'application/json',
					},
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'categories',
	})
}
