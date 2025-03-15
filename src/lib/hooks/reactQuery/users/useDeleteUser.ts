import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useAddUser() {
	return useCustomMutation({
		mutationKey: ['DeleteUser'],
		apiCall: ({ userId }: { userId: string }) =>
			axios
				.delete(`/users/${userId}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'users',
	})
}
