import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export function useDrivers(id: string | undefined = undefined) {
	return useCustomQuery({
		queryKeyName: id ? 'driver' : 'drivers',
		queryKeyValue: id,
	})
}
