'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import CustomSelect from '@/components/UI/forms/customSelect/CustomSelect'
import useAddUser from '@/lib/hooks/reactQuery/users/useAddUser'
import { UserCreate, userCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './CreateUser.module.scss'

const defaultErrorMessage = 'Ошибка при создании пользователя'

export default function CreateUser() {
	const mutation = useAddUser('multipart/form-data')

	const onSubmit = createOnSubmit<UserCreate>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<UserCreate>
				schema={userCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				buttonDefaultMessage='Создать'
				buttonSuccessMessage='Пользователь создан'
			>
				<h2 className={styles.formTitle}>Добавление пользователя</h2>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='email' type='email' placeholder='Почта' />
				<CustomInput name='password' type='password' placeholder='Пароль' />
				<CustomSelect name='role'>
					<option value={'USER'}>Пользователь</option>
					<option value={'ADMIN'}>Администратор</option>
					<option value={'MANAGER'}>Менеджер</option>
					<option value={'SERVICE_MANAGER'}>Сервисный менеджер</option>
					<option value={'EDITOR'}>Редактор</option>
				</CustomSelect>
			</CustomForm>
		</div>
	)
}
