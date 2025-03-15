'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditProfile from '@/lib/hooks/reactQuery/profile/useEditProfile'
import { editProfileSchema, ProfileEdit } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditProfile.module.scss'

const defaultErrorMessage = 'Ошибка редактирования аккаунта'
//TODO: добавить значения по умолчанию
export default function EditProfile() {
	const mutation = useEditProfile('multipart/form-data')

	const onSubmit = createOnSubmit<ProfileEdit>(mutation, {
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<ProfileEdit>
				schema={editProfileSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<h2 className={styles.formTitle}>Редактирование профиля</h2>
				<CustomInput name='name' type='text' placeholder='Введите новое имя' />
				<CustomFileInput name='avatar' />
			</CustomForm>
		</div>
	)
}
