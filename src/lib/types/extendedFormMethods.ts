import { UseFormReturn } from 'react-hook-form'

export type ExtendedFormMethods<T> = UseFormReturn<T> & {
	serverSuccess: string | null
	setServerSuccess: (msg: string | null) => void
}
