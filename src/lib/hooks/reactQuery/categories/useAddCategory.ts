import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { Category } from '@/lib/types/category'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useAddCategory() {
	return useCustomMutation({
		mutationKey: ['AddCategory'],
		apiCall: (data: Category) =>
			axios
				.post('/categories', data)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'categories',
	})
}
