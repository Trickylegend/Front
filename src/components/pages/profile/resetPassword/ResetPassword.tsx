'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useResetPassword from '@/lib/hooks/reactQuery/profile/useResetPassword'
import { ResetPasswordProfile, resetPasswordSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './ResetPassword.module.scss'

const defaultErrorMessage = 'Ошибка восстановления пароля'

export default function ResetPassword() {
	const mutation = useResetPassword()

	const onSubmit = createOnSubmit<ResetPasswordProfile>(mutation, {
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ResetPasswordProfile>
				schema={resetPasswordSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Редактирование пароля</h2>
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
