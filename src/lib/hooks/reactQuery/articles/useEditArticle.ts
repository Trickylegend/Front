import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { Article } from '@/lib/types'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useEditArticle(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['EditArticle'],
		apiCall: (data: Article) =>
			axios
				.put(`/articles/${data.id}`, {
					title: data.title,
					description: data.description,
					isAvailable: data.isAvailable,
				}, {
					headers: {
						'Content-Type':
							contentType === 'multipart/form-data'
								? 'multipart/form-data'
								: 'application/json',
					},
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'articles',
	})
}
