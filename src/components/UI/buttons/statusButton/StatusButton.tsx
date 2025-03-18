
import { EntityType, statusSchema, StatusType } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import CustomForm from '../../forms/customForm/CustomForm'
import CustomInput from '../../forms/customInput/CustomInput'
import styles from './StatusButton.module.scss'
import useStatus from '@/lib/hooks/reactQuery/management/useStatus'

const errorMessage = 'Ошибка изменения статуса'

export default function StatusButton({
	entityType,
	id,
	status,
	deactivateText,
	activateText,
}: {
	entityType: EntityType
	id: string
	status: boolean
	deactivateText: string
	activateText: string
}) {
	const mutation = useStatus({ entityType })
	const onSubmit = createOnSubmit<StatusType>(mutation, {
		defaultErrorMessage: errorMessage,
	})
	const initialValues = {
		id,
		isActive: !status,
	}
	const buttonText = status ? deactivateText : activateText

	return (
		<div className={styles.container}>
			<CustomForm<StatusType>
				schema={statusSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={errorMessage}
				buttonDefaultMessage={buttonText}
				initialValues={initialValues}
				removeStyles={true}
			>
				<CustomInput name='id' type='hidden' />
				<CustomInput name='isActive' type='hidden' />
			</CustomForm>
		</div>
	)
}
