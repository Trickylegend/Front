import AddDriver from '@/components/pages/ROLES/SERVICE_MANAGER/driver/addDriver/AddDriver'
import Drivers from '@/components/pages/ROLES/SERVICE_MANAGER/driver/drivers/Drivers'
import EditDriver from '@/components/pages/ROLES/SERVICE_MANAGER/driver/editDriver/EditDriver'
import AddTransport from '@/components/pages/ROLES/SERVICE_MANAGER/transport/addTransport/AddTransport'
import EditTransport from '@/components/pages/ROLES/SERVICE_MANAGER/transport/editTransport/EditTransport'
import Transports from '@/components/pages/ROLES/SERVICE_MANAGER/transport/transports/Transports'
import { Driver, Transport } from '@/lib/types'

const driver: Driver = {
	id: 'driver_id',
	name: 'Евгений',
	description: 'Описание водителя',
	isAvailable: true,
	avatar: 'link_to_avatar',
}

const transport: Transport = {
	id: '1',
	name: 'Камаз',
	description: 'Лучший грузовой транспорт',
	price: 40.4,
	isAvailable: true,
	serviceStatus: 'notRequired',
	serviceStandard: 30.0,
	usageQuantity: 14.3,
	preview: 'link_to_preview',
}

export default function page() {
	return (
		<>
			<h2>Страница сервисного менеджера</h2>
			<br />

			<br />
			<hr />
			<br />
			<div style={{ display: 'flex', gap: '30px' }}>
				<AddDriver />
				<EditDriver driver={driver} />
			</div>
			<Drivers />
			<br />
			<hr />
			<br />

			<br />
			<hr />
			<br />
			<div style={{ display: 'flex', gap: '30px' }}>
				<AddTransport />
				<EditTransport transport={transport} />
			</div>
			<Transports />
			<br />
			<hr />
			<br />
		</>
	)
}
