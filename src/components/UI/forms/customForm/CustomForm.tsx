'use client'

import { ExtendedFormMethods } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import styles from './CustomForm.module.scss'

type CustomFormProps<T> = {
	schema: any
	initialValues?: T
	onSubmit: (data: T, methods: ExtendedFormMethods<T>) => Promise<void> | void
	defaultErrorMessage?: string
	defaultSuccessMessage?: string
	children: React.ReactNode
}

export default function CustomForm<T>({
	schema,
	initialValues = {} as T,
	onSubmit,
	defaultErrorMessage,
	children,
}: CustomFormProps<T>) {
	const methods = useForm<T>({
		defaultValues: initialValues,
		resolver: zodResolver(schema),
	}) as ExtendedFormMethods<T>

	const [serverSuccess, setServerSuccess] = React.useState<string | null>(null)

	methods.serverSuccess = serverSuccess
	methods.setServerSuccess = setServerSuccess

	const {
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = methods

	const handleCustomSubmit = async (data: T) => {
		try {
			await onSubmit(data, methods)
		} catch (error: any) {
			setError('root', {
				message: error?.response?.data?.message || defaultErrorMessage,
			})
		}
	}

	const buttonClass = errors.root
		? styles.errorButton
		: serverSuccess
		? styles.successButton
		: styles.button

	const buttonText = isSubmitting
		? 'Сохранение...'
		: errors.root
		? 'Ошибка'
		: serverSuccess
		? 'Успех'
		: 'Сохранить'

	return (
		<FormProvider {...methods}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(handleCustomSubmit)}
				noValidate
			>
				{children}
				<button disabled={isSubmitting} type='submit' className={buttonClass}>
					{buttonText}
				</button>
				{errors.root && (
					<div className={styles.errorMessage}>
						{errors.root.message as string}
					</div>
				)}
				{serverSuccess && (
					<div className={styles.successMessage}>{serverSuccess}</div>
				)}
			</form>
		</FormProvider>
	)
}
