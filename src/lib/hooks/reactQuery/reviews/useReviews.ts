import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useReviews(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'review' : 'reviews',
		queryKeyValue: id,
	})
}
