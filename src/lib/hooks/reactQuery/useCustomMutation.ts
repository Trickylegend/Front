import {
	useMutation,
	UseMutationResult,
	useQueryClient,
} from '@tanstack/react-query'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

interface CustomMutationOptions<
	TVariables,
	TData = any,
	TError = AxiosError | AxiosResponse
> {
	mutationKey: string[]
	apiCall: (data: TVariables) => Promise<TData>
	invalidateQueryKey?: string | undefined
	axiosConfig?: AxiosRequestConfig;
}

export default function useCustomMutation<
	TVariables,
	TData = any,
	TError = AxiosError | AxiosResponse
>({
	mutationKey,
	apiCall,
	invalidateQueryKey,
}: CustomMutationOptions<TVariables, TData, TError>): UseMutationResult<
	TData,
	TError,
	TVariables,
	unknown
> {
	const queryClient = useQueryClient()

	return useMutation<TData, TError, TVariables>({
		mutationKey,
		mutationFn: async (data: TVariables) => {
			return await apiCall(data)
		},
		onError: (error: TError) => {
			console.error('Ошибка при выполнении запроса:', error)
		},
		onSuccess: () => {
			if (invalidateQueryKey) {
				queryClient.invalidateQueries({ queryKey: [invalidateQueryKey] })
			}
		},
	})
}
