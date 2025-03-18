'use client'

import CustomCheckBox from '@/components/UI/forms/customCheckBox/CustomCheckBox'
import CustomFileInput from '@/components/UI/forms/customFileInput/CustomFileInput'
import CustomForm from '@/components/UI/forms/customForm/CustomForm'
import CustomInput from '@/components/UI/forms/customInput/CustomInput'
import CustomSelect from '@/components/UI/forms/customSelect/CustomSelect'
import useAddTransport from '@/lib/hooks/reactQuery/transports/useAddTransport'
import { Category, TransportCreate, transportCreateSchema } from '@/lib/types'
import { createOnSubmit } from '@/lib/utils/createOnSubmit'
import styles from './AddTransport.module.scss'

const defaultErrorMessage = 'Ошибка добавления транспорта'

export default function AddTransport({
	categories,
}: {
	categories: Category[]
}) {
	const mutation = useAddTransport('multipart/form-data')

	const onSubmit = createOnSubmit<TransportCreate>(mutation, {
		useFormData: true,
		fileKeys: ['preview'],
		defaultErrorMessage: defaultErrorMessage,
	})

	return (
		<div className={styles.сontainer}>
			<CustomForm<TransportCreate>
				schema={transportCreateSchema}
				onSubmit={onSubmit}
				defaultErrorMessage={defaultErrorMessage}
				formTitle='Добавление транспорта'
			>
				<CustomInput name='name' type='text' placeholder='Имя' />
				<CustomInput name='description' type='text' placeholder='Описание' />
				<CustomInput
					name='price'
					type='number'
					step={0.01}
					placeholder='Цена'
				/>
				<CustomSelect name='serviceStatus'>
					<option value={'required'}>Требуется обслуживание</option>
					<option value={'notRequired'}>Обслуживание не требуется</option>
					<option value={'isService'}>Находится в обслуживании</option>
				</CustomSelect>
				<CustomSelect name='categoryId'>
					{categories?.map((category: Category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
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
				<CustomCheckBox name='isActive' label={'Доступен к заказу'} />
				<CustomFileInput name='preview' />
			</CustomForm>
		</div>
	)
}
