import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDeleteReview() {
	return useCustomMutation({
		mutationKey: ['DeleteReview'],
		apiCall: ({ reviewId }: { reviewId: string | undefined }) =>
			axios
				.delete(`/reviews/${reviewId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'reviews',
	})
}
