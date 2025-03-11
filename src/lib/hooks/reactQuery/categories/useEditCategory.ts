import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { Category } from '@/lib/types'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useEditCategory() {
	return useCustomMutation({
		mutationKey: ['EditCategory'],
		apiCall: (data: Category) =>
			axios
				.put(`/categories/${data.id}`, {
					name: data.name,
					description: data.description,
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'categories',
	})
}
