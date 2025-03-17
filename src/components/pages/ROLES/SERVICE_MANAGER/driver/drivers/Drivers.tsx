'use client'

import Driver from '@/components/UI/cards/driver/Driver'
import { Driver as DriverType } from '@/lib/types'
import React from 'react'
import AddDriver from '../addDriver/AddDriver'
import EditDriver from '../editDriver/EditDriver'
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
	const [activeDriver, setActiveDriver] = React.useState<DriverType>()

	return (
		<div className={styles.container}>
			<h2>Управление водителями</h2>
			<div className={styles.controlContainer}>
				<AddDriver />
				{activeDriver && (
					<EditDriver key={activeDriver.id} driver={activeDriver} />
				)}
			</div>
			<div className={styles.flexContainer}>
				{drivers?.map((driver: DriverType) => (
					<Driver
						key={driver.id}
						driver={driver}
						control={true}
						onClick={() => setActiveDriver(driver)}
					/>
				))}
			</div>
		</div>
	)
}
