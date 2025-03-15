import { ExtendedFormMethods } from '@/lib/types'
import { transformDataToFormData } from './transformDataToFormData'

interface CreateOnSubmitOptions<T> {
	useFormData?: boolean
	fileKeys?: (keyof T)[]
	defaultErrorMessage?: string
}

export function createOnSubmit<T extends Record<string, any>>(
	mutation: { mutateAsync: (data: any) => Promise<any> },
	options: CreateOnSubmitOptions<T> = {},
	extraData?: Partial<T>,
	extraFunc?: () => void
) {
	return async (data: T, methods: ExtendedFormMethods<T>) => {
		let payload: T | FormData = data
		if (options.useFormData) {
			payload = transformDataToFormData<T>(data, options.fileKeys || [])
		}
		if (extraData) {
			payload = { ...payload, ...extraData }
		}
		try {
			const result = await mutation.mutateAsync(payload)
			methods.setServerSuccess(result.message)
			if (extraFunc) {
				extraFunc()
			}
		} catch (error: any) {
			methods.setError('root', {
				message:
					error.response?.data?.message ||
					options.defaultErrorMessage ||
					'Ошибка отправки',
			})
		}
	}
}
