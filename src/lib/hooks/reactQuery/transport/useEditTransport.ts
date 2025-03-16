import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useEditTransport(
	contentType: 'json' | 'multipart/form-data' = 'json'
) {
	return useCustomMutation({
		mutationKey: ['EditTransport'],
		apiCall: (data: FormData | any) =>
			axios
				.put(
					`/transport/${contentType == 'json' ? data.id : data.get('id')}`,
					data,
					{
						headers: {
							'Content-Type':
								contentType === 'multipart/form-data'
									? 'multipart/form-data'
									: 'application/json',
						},
					}
				)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: 'transport',
	})
}
