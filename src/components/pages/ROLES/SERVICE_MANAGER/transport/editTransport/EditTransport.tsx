'use client'
import CustomCheckBox from '@/components/UI/forms/customCheckBox/CustomCheckBox'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import CustomSelect from '@/components/UI/forms/customSelect/CustomSelect'
import useEditTransport from '@/lib/hooks/reactQuery/transports/useEditTransport'
import {
	Category,
	Transport,
	TransportEdit,
	transportEditSchema,
} from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './EditTransport.module.scss'

const defaultErrorMessage = 'Ошибка редактирования транспорта'

export default function EditTransport({
	transport,
	categories,
}: {
	transport: Transport
	categories: Category[]
}) {
	const mutation = useEditTransport('multipart/form-data')

	const onSubmit = createOnSubmit<TransportEdit>(mutation, {
		useFormData: true,
		fileKeys: ['preview'],
		defaultErrorMessage: defaultErrorMessage,
	})

	const initialValues: TransportEdit = {
		id: transport.id,
		name: transport.name,
		description: transport.description,
		price: transport.price,
		categoryId: transport.categoryId,
		isAvailable: transport.isAvailable,
		serviceStatus: transport.serviceStatus,
		serviceStandard: transport.serviceStandard,
		usageQuantity: transport.usageQuantity,
	}

	return (
		<div className={styles.сontainer}>
			<CustomForm<TransportEdit>
				schema={transportEditSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				initialValues={initialValues}
				formTitle={`Редактирование транспорта - ${transport.id}`}
			>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomInput
					name='price'
					type='number'
					step={0.01}
					placeholder='Цена'
				/>
				<CustomSelect name='categoryId'>
					{categories?.map((category: Category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</CustomSelect>
				<CustomSelect name='serviceStatus'>
					<option value={'required'}>Требуется обслуживание</option>
					<option value={'notRequired'}>Обслуживание не требуется</option>
					<option value={'isService'}>Находится в обслуживании</option>
				</CustomSelect>
				<CustomInput
					name='serviceStandard'
					type='number'
					step={0.01}
					placeholder='Стандарт обслуживания'
				/>
				<CustomInput
					name='usageQuantity'
					type='number'
					step={0.01}
					placeholder='Текущий износ'
				/>
				<CustomCheckBox name='isAvailable' label={'Доступен к заказу'} />
				<CustomFileInput name='preview' />
			</CustomForm>
		</div>
	)
}
