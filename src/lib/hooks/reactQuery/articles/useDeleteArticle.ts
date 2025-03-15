import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDeleteArticle() {
	return useCustomMutation({
		mutationKey: ['DeleteArticle'],
		apiCall: ({ articleId }: { articleId: string }) =>
			axios
				.delete(`/articles/${articleId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'articles',
	})
}
