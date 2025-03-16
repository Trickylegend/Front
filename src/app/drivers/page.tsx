import AddDriver from '@/components/pages/driversPage/addDriver/AddDriver'
import EditDriver from '@/components/pages/driversPage/editDriver/EditDriver'
import { Driver } from '@/lib/types'

const driver: Driver = {
	id: 'driver_id',
	name: 'Евгений',
	description: 'Описание водителя',
	isAvailable: true,
	avatar: 'link_to_avatar',
}

export default function page() {
	return (
		<>
			<AddDriver />
			<EditDriver driver={driver} />
		</>
	)
}
