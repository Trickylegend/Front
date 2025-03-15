import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDeleteDriver() {
	return useCustomMutation({
		mutationKey: ['DeleteDriver'],
		apiCall: ({ driverId }: { driverId: string | undefined }) =>
			axios
				.delete(`/drivers/${driverId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'drivers',
	})
}
