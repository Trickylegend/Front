import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useTransport(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'transport' : 'transport',
		queryKeyValue: id,
	})
}
