import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDeleteCategory() {
	return useCustomMutation({
		mutationKey: ['DeleteCategory'],
		apiCall: ({ categoryId }: { categoryId: string | undefined }) =>
			axios
				.delete(`/categories/${categoryId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'categories',
	})
}
