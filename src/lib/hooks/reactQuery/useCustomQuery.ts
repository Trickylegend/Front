import {
	setMessage,
	setStatusCode,
} from '@/lib/redux/features/server/serverSlice'
import { useAppDispatch } from '@/lib/redux/hooks'
import axios from '@/lib/utils/axios'
import getServerResponse, { ServerResponse } from '@/lib/utils/getServerStatus'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import React from 'react'

async function getData({
	queryKeyName,
	queryKeyValue,
}: {
	queryKeyName: string
	queryKeyValue?: string
}) {
	const response = queryKeyValue
		? await axios.get(`/${queryKeyName}/${queryKeyValue}`)
		: await axios.get(`/${queryKeyName}`)
	return response.data
}

interface UseCustomQueryProps {
	queryKeyName: string
	queryKeyValue?: string
	staleTime?: number
	gcTime?: number
	successMessage?: string
	errorMessage?: string
}

export default function useCustomQuery({
	queryKeyName,
	queryKeyValue,
	staleTime = 1000 * 60 * 15,
	gcTime = 1000 * 60 * 60 * 1,
	errorMessage = 'Ошибка при загрузке данных',
	successMessage = 'Данные успешно загружены',
}: UseCustomQueryProps) {
	const dispatch = useAppDispatch()
	const { data, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: queryKeyValue ? [queryKeyName, queryKeyValue] : [queryKeyName],
		queryFn: async () => {
			const data = await getData({ queryKeyName, queryKeyValue })
			return data[queryKeyName]
		},
		staleTime,
		gcTime,
	})

	React.useEffect(() => {
		if (isSuccess) {
			dispatch(setStatusCode(200))
			dispatch(setMessage(successMessage))
		}
	}, [isSuccess, data, dispatch, successMessage])

	React.useEffect(() => {
		if (isError) {
			const serverResponse: ServerResponse = getServerResponse(
				error as AxiosError
			)
			dispatch(setStatusCode(serverResponse.code))
			dispatch(setMessage(serverResponse.message || errorMessage))
		}
	}, [isError, error, dispatch, errorMessage])

	return {
		[queryKeyName]: data,
		isLoading,
		isSuccess,
		isError,
		error,
	}
}
