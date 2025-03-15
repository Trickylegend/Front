import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { Category } from '@/lib/types'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useEditCategory(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['EditCategory'],
		apiCall: (data: Category) =>
			axios
				.put(
					`/categories/${data.id}`,
					{
						name: data.name,
						description: data.description,
					},
					{
						headers: {
							'Content-Type':
								contentType === 'multipart/form-data'
									? 'multipart/form-data'
									: 'application/json',
						},
					}
				)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'categories',
	})
}
