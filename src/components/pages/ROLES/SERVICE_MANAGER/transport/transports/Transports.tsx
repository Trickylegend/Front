'use client'

import Transport from '@/components/UI/cards/transport/Transport'
import { useCategories } from '@/lib/hooks/reactQuery/categories/useCategories'
import { Transport as TransportType } from '@/lib/types'
import React from 'react'
import AddTransport from '../addTransport/AddTransport'
import EditTransport from '../editTransport/EditTransport'
import styles from './Transports.module.scss'

const transport: TransportType[] = [
	{
		id: '1',
		name: 'Камаз',
		description: 'Лучший грузовой транспорт',
		price: 40.4,
		categoryId: 'ca1462e3-bec6-4b53-b96d-3d1527c05d5e',
		isAvailable: true,
		serviceStatus: 'notRequired',
		serviceStandard: 30.0,
		usageQuantity: 14.3,
	},
	{
		id: '2',
		name: 'МАЗ',
		description: 'Тяжелый тягач',
		price: 105.0,
		categoryId: 'bc1263e7-4fd2-4a25-b6c6-3525ba08e6db',
		isAvailable: false,
		serviceStatus: 'required',
		serviceStandard: 55.0,
		usageQuantity: 32.4,
	},
]

export default function Transports() {
	// const { transport } = useTransport()
	const { categories } = useCategories()
	const [activeTransport, setActiveTransport] = React.useState<TransportType>()

	return (
		<div className={styles.container}>
			<h2>Управление транспортом</h2>
			<div className={styles.controlContainer}>
				<AddTransport categories={categories || []} />
				{activeTransport && (
					<EditTransport
						key={activeTransport.id}
						transport={activeTransport}
						categories={categories || []}
					/>
				)}
			</div>
			<div className={styles.flexContainer}>
				{transport.map((transportItem: TransportType) => (
					<Transport
						key={transportItem.id}
						transport={transportItem}
						control={true}
						onEdit={() => setActiveTransport(transportItem)}
					/>
				))}
			</div>
		</div>
	)
}
