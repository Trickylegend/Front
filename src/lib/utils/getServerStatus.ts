import axios, { AxiosError, AxiosResponse } from 'axios'

export interface ServerResponse {
	code: number
	message: string
}

function getServerErrorStatus(error: AxiosError): {
	code: number
	message: string
} {
	const status = error.response?.status || 500
	const data = error.response?.data as ServerResponse
	const message = data?.message || 'Неизвестная ошибка'
	return { code: status, message }
}

export default function getServerResponse(
	responseOrError: AxiosResponse | AxiosError
): ServerResponse {
	if (axios.isAxiosError(responseOrError)) {
		return getServerErrorStatus(responseOrError)
	}
	const response = responseOrError as AxiosResponse
	return {
		code: response.status,
		message: (response.data as any)?.message || 'Операция выполнена успешно',
	}
}
