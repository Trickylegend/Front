import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { entityMap, EntityType } from '@/lib/types'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useDelete({ entityType }: { entityType: EntityType }) {
	const { capitalized, plural } = entityMap[entityType]

	return useCustomMutation({
		mutationKey: [`Delete${capitalized}`],
		apiCall: ({ id }: { id: string }) =>
			axios
				.delete(`/${plural}/${id}`)
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: plural,
	})
}
