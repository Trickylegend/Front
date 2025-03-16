'use client'

import Transport from '@/components/UI/cards/transport/Transport'
import { Transport as TransportType } from '@/lib/types'
import styles from './Transports.module.scss'

const transport: TransportType[] = [
	{
		id: '1',
		name: 'Камаз',
		description: 'Лучший грузовой транспорт',
		price: 40.4,
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
		isAvailable: false,
		serviceStatus: 'required',
		serviceStandard: 55.0,
		usageQuantity: 32.4,
	},
]

export default function Transports() {
	// const { transport } = useTransport()
	return (
		<div className={styles.container}>
			<h2>Управление транспортом</h2>
			<div className={styles.flexContainer}>
				{transport?.map((transportItem: TransportType) => (
					<Transport
						key={transportItem.id}
						transport={transportItem}
						control={true}
					/>
				))}
			</div>
		</div>
	)
}
