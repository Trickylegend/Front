'use client'

import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import useEditProfile from '@/lib/hooks/reactQuery/profile/useEditProfile'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import { z } from 'zod'
import styles from './EditProfile.module.scss'

const defaultErrorMessage = 'Ошибка редактирования аккаунта'

export default function EditProfile() {
	const editProfileSchema = z.object({
		name: z.string(),
		avatar: z
			.any()
			.refine(val => {
				if (typeof window !== 'undefined') {
					return val instanceof FileList && val.length > 0
				}
				return true
			}, 'Файл обязателен')
			.optional(),
	})

	type EditProfileData = z.infer<typeof editProfileSchema>

	const mutation = useEditProfile('multipart/form-data')

	const onSubmit = createOnSubmit<EditProfileData>(mutation, {
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.container}>
			<CustomForm<EditProfileData>
				schema={editProfileSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
			>
				<CustomInput name='name' type='text' placeholder='Введите новое имя' />
				<CustomFileInput name='avatar' />
			</CustomForm>
		</div>
	)
}
