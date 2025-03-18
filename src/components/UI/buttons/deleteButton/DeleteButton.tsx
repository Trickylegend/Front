'use client'

import useDelete from '@/lib/hooks/reactQuery/useDelete'
import { deleteSchema, DeleteType, EntityType } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import CustomForm from '../../forms/customForm/CustomForm'
import CustomInput from '../../forms/customInput/CustomInput'
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
