'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useResetPassword from '@/lib/hooks/reactQuery/profile/useResetPassword'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import { z } from 'zod'
import styles from './ResetPassword.module.scss'

const defaultErrorMessage = 'Ошибка восстановления пароля'

export default function ResetPassword() {
	const resetPasswordSchema = z
		.object({
			oldPassword: z.string().min(8, 'Введите корректный пароль!'),
			newPassword: z.string().min(8, 'Минимальное количество символов - 8'),
			repeatNewPassword: z
				.string()
				.min(8, 'Минимальное количество символов - 8'),
		})
		.superRefine(({ newPassword, repeatNewPassword }, ctx) => {
			if (newPassword !== repeatNewPassword) {
				ctx.addIssue({
					path: ['repeatNewPassword'],
					message: 'Пароли должны совпадать!',
					code: 'custom',
				})
			}
		})

	type ResetPasswordData = z.infer<typeof resetPasswordSchema>

	const mutation = useResetPassword()

	const onSubmit = createOnSubmit<ResetPasswordData>(mutation, {
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ResetPasswordData>
				schema={resetPasswordSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h3>Изменение пароля</h3>
				<CustomInput
					name='oldPassword'
					type='password'
					placeholder='Введите текущий пароль'
				/>
				<CustomInput
					name='newPassword'
					type='password'
					placeholder='Введите новый пароль'
				/>
				<CustomInput
					name='repeatNewPassword'
					type='password'
					placeholder='Повторите новый пароль'
				/>
			</CustomForm>
		</div>
	)
}
