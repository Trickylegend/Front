import useCustomMutation from '@/lib/hooks/reactQuery/useCustomMutation'
import { entityMap, EntityType, StatusType } from '@/lib/types'
import axios from '@/lib/utils/axios'
import { AxiosResponse } from 'axios'

export default function useStatus({ entityType }: { entityType: EntityType }) {
	const { capitalized, plural } = entityMap[entityType]

	return useCustomMutation({
		mutationKey: [`Edit${capitalized}`],
		apiCall: ({ id, isActive }: StatusType) =>
			axios
				.put(`/${plural}/${id}`, {
					isActive,
				})
				.then((response: AxiosResponse) => response.data),
		invalidateQueryKey: plural,
	})
}
