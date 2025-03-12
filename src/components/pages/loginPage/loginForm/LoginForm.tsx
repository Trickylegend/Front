'use client'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import { ExtendedFormMethods } from '@/lib/types'
import { z } from 'zod'
import styles from './LoginForm.module.scss'

import useLogin from '@/lib/hooks/reactQuery/auth/useLogin'

const loginSchema = z.object({
	email: z.string().email('Почта обязательна'),
	password: z.string().min(8, 'Минимальное количество символов - 8'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
	const mutation = useLogin()

	const defaultErrorMessage = 'Ошибка авторизации'

	const onSubmit = async (
		data: LoginFormData,
		methods: ExtendedFormMethods<LoginFormData>
	) => {
		try {
			const result = await mutation.mutateAsync(data)
			methods.setServerSuccess(result.message)
		} catch (error: any) {
			methods.setError('root', {
				message: error.response?.data?.message || defaultErrorMessage,
			})
		}
	}

	return (
		<div className={styles.formContainer}>
			<h2>Авторизация</h2>
			<CustomForm<LoginFormData>
				schema={loginSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<CustomInput name='email' type='email' placeholder='Почта' />
				<CustomInput name='password' type='password' placeholder='Пароль' />
			</CustomForm>
		</div>
	)
}
