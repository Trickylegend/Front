'use client'

import CustomCheckBox from '@/components/UI/forms/customCheckBox/CustomCheckBox'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import CustomSelect from '@/components/UI/forms/customSelect/CustomSelect'
import useEditUser from '@/lib/hooks/reactQuery/users/useEditUser'
import { User, UserEdit, userEditSchema } from '@/lib/types/user'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditUser.module.scss'

const defaultErrorMessage = 'Ошибка при редактировании пользователя'

export default function EditUser({ user }: { user: User }) {
	const mutation = useEditUser('multipart/form-data')

	const onSubmit = createOnSubmit<UserEdit>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	const initialValues: UserEdit = {
		id: user.id,
		name: user.name,
		email: user.email,
		password: '',
		role: user.role,
		isActive: user.isActive,
	}

	return (
		<div className={styles.formContainer}>
			<CustomForm<UserEdit>
				schema={userEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
				formTitle={`Редактирование пользователя ${user.id}`}
			>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='email' type='email' placeholder='Email' />
				<CustomInput
					name='password'
					type='password'
					placeholder='Новый пароль (если меняется)'
				/>
				<CustomCheckBox name='isActive' label='Активировать аккаунт' />
				<CustomSelect name='role'>
					<option value={'USER'}>Пользователь</option>
					<option value={'ADMIN'}>Администратор</option>
					<option value={'MANAGER'}>Менеджер</option>
					<option value={'SERVICE_MANAGER'}>Сервисный менеджер</option>
					<option value={'EDITOR'}>Редактор</option>
				</CustomSelect>
				<CustomFileInput name='avatar' />
			</CustomForm>
		</div>
	)
}
