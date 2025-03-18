'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditProfile from '@/lib/hooks/reactQuery/profile/useEditProfile'
import { editProfileSchema, ProfileBasic, ProfileEdit } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditProfile.module.scss'

const defaultErrorMessage = 'Ошибка редактирования аккаунта'
export default function EditProfile({ info }: { info: ProfileBasic }) {
	const mutation = useEditProfile('multipart/form-data')

	const onSubmit = createOnSubmit<ProfileEdit>(mutation, {
		useFormData: true,
		fileKeys: ['avatar'],
		defaultErrorMessage: defaultErrorMessage,
	})

	const initialValues: ProfileEdit = {
		name: info.name,
	}

	return (
		<div className={styles.container}>
			<CustomForm<ProfileEdit>
				schema={editProfileSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				formTitle='Редактирование профиля'
				initialValues={initialValues}
			>
				<CustomInput name='name' type='text' placeholder='Введите новое имя' />
				<CustomFileInput name='avatar' />
			</CustomForm>
		</div>
	)
}
