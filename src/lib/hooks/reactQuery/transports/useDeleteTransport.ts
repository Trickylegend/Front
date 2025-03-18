import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDeleteTransport() {
	return useCustomMutation({
		mutationKey: ['DeleteTransport'],
		apiCall: ({ transportId }: { transportId: string | undefined }) =>
			axios
				.delete(`/transport/${transportId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'transport',
	})
}
