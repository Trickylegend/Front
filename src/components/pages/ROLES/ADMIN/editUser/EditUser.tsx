'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditUser from '@/lib/hooks/reactQuery/users/useEditUser'
import { User, UserEdit, userEditSchema } from '@/lib/types/user'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditUser.module.scss'

const defaultErrorMessage = 'Ошибка при редактировании пользователя'

export default function EditUser({ user }: { user: User }) {
	const mutation = useEditUser('multipart/form-data')

	const onSubmit = createOnSubmit<UserEdit>(
		mutation,
		{
			useFormData: true,
			fileKeys: ['avatar'],
			defaultErrorMessage: defaultErrorMessage,
		},
		{ id: user.id }
	)

	const initialValues: UserEdit = {
		id: user.id,
		name: user.name,
		email: user.email,
		password: '',
		role: user.role,
	}

	return (
		<div className={styles.formContainer}>
			<h2>Редактирование пользователя – {user.id}</h2>
			<CustomForm<UserEdit>
				schema={userEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
			>
				<h2 className={styles.formTitle}>Редактирование пользователя</h2>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='email' type='email' placeholder='Email' />
				<CustomInput
					name='password'
					type='password'
					placeholder='Новый пароль (если меняется)'
				/>
				<CustomInput name='role' type='text' placeholder='Роль' />
				<CustomFileInput name='avatar' />
			</CustomForm>
		</div>
	)
}
