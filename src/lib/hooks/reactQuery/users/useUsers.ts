import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useUsers(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'user' : 'users',
		queryKeyValue: id,
	})
}
