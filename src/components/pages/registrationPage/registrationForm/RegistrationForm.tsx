'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useRegistration from '@/lib/hooks/reactQuery/auth/useRegistration'
import { ExtendedFormMethods } from '@/lib/types'
import { z } from 'zod'
import styles from './RegistrationForm.module.scss'

const registrationSchema = z.object({
	name: z.string().min(1, 'Введите!'),
	email: z.string().email('Почта обязательна'),
	password: z.string().min(8, 'Минимальное количество символов - 8'),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationForm() {
	const mutation = useRegistration()

	const onSubmit = async (
		data: RegistrationFormData,
		methods: ExtendedFormMethods<RegistrationFormData>
	) => {
		try {
			const result = await mutation.mutateAsync(data)
			methods.setServerSuccess(result.message)
		} catch (error: any) {
			methods.setError('root', {
				message: error.response?.data?.message,
			})
		}
	}

	return (
		<div className={styles.formContainer}>
			<CustomForm<RegistrationFormData>
				schema={registrationSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={'Ошибка регистрации'}
			>
				<CustomInput name='text' type='name' placeholder='Имя' />
				<CustomInput name='email' type='email' placeholder='Почта' />
				<CustomInput name='password' type='password' placeholder='Пароль' />
			</CustomForm>
		</div>
	)
}
