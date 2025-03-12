import useCustomQuery from '@/lib/hooks/reactQuery/useCustomQuery'

export default function useActiveUser() {
	return useCustomQuery({
		queryKeyName: 'activeUser',
	})
}
