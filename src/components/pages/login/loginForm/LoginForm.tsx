'use client'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useLogin from '@/lib/hooks/reactQuery/auth/useLogin'
import { LoginPayload, loginSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import { useRouter } from 'next/navigation'
import styles from './LoginForm.module.scss'

const defaultErrorMessage = 'Ошибка авторизации'

export default function LoginForm() {
	const mutation = useLogin()

	const router = useRouter()

	const onSubmit = createOnSubmit<LoginPayload>(
		mutation,
		{
			defaultErrorMessage,
		},
		undefined,
		() => {
			router.refresh()
		}
	)

	return (
		<div className={styles.сontainer}>
			<CustomForm<LoginPayload>
				schema={loginSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				formTitle='Авторизация'
			>
				<CustomInput name='email' type='email' placeholder='Почта' />
				<CustomInput name='password' type='password' placeholder='Пароль' />
			</CustomForm>
		</div>
	)
}
