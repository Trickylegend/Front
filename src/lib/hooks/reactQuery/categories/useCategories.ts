import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useCategories(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'category' : 'categories',
		queryKeyValue: id,
	})
}
