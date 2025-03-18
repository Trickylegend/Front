import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useTransports(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'transport' : 'transports',
		queryKeyValue: id,
	})
}
