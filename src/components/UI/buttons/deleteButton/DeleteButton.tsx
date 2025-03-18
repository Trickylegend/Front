'use client'

import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'

import useDelete from '@/lib/hooks/reactQuery/management/useDelete'
import { deleteSchema, DeleteType, EntityType } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './DeleteButton.module.scss'

const errorMessage = 'Ошибка удаления'

export default function DeleteButton({
	entityType,
	id,
}: {
	entityType: EntityType
	id: string
}) {
	const mutation = useDelete({ entityType })
	const onSubmit = createOnSubmit<DeleteType>(mutation, {
		defaultErrorMessage: errorMessage,
	})
	const initialValues = {
		id,
	}
	return (
		<div className={styles.container}>
			<CustomForm<DeleteType>
				schema={deleteSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={errorMessage}
				buttonDefaultMessage={'Удалить'}
				initialValues={initialValues}
				removeStyles={true}
			>
				<CustomInput name='id' type='hidden' />
			</CustomForm>
		</div>
	)
}
