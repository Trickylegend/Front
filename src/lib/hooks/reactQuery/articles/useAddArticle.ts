import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useAddArticle(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['AddArticle'],
		apiCall: (data: FormData | any) =>
			axios
				.post('/articles', data, {
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
