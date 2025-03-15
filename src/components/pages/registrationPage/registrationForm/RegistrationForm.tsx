'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useRegistration from '@/lib/hooks/reactQuery/auth/useRegistration'
import { RegistrationPayload, registrationSchema } from '@/lib/types/auth'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './RegistrationForm.module.scss'

const defaultErrorMessage = 'Ошибка регистрации'

export default function RegistrationForm() {
	const mutation = useRegistration()

	const onSubmit = createOnSubmit<RegistrationPayload>(mutation, {
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.сontainer}>
			<CustomForm<RegistrationPayload>
				schema={registrationSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Регистрация</h2>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='email' type='email' placeholder='Почта' />
				<CustomInput name='password' type='password' placeholder='Пароль' />
			</CustomForm>
		</div>
	)
}
