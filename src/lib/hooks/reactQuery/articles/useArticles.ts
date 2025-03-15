import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useArticles(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'article' : 'articles',
		queryKeyValue: id,
	})
}
