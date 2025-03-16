'use client'

import Driver from '@/components/UI/cards/driver/Driver'
import { Driver as DriverType } from '@/lib/types'
import styles from './Drivers.module.scss'

const drivers: DriverType[] = [
	{
		id: '1',
		name: 'Евгений',
		description: 'Очень опытный водитель',
		isAvailable: false,
	},
	{
		id: '2',
		name: 'Петр',
		description: 'Водитель со стажем',
		isAvailable: false,
	},
]

export default function Drivers() {
	// const { drivers } = useDrivers()
	return (
		<div className={styles.container}>
			<h2>Управление водителями</h2>
			<div className={styles.flexContainer}>
				{drivers?.map((driver: DriverType) => (
					<Driver key={driver.id} driver={driver} control={true} />
				))}
			</div>
		</div>
	)
}
