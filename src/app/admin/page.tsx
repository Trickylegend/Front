import CreateUser from '@/components/pages/ROLES/ADMIN/createUser/CreateUser'
import EditUser from '@/components/pages/ROLES/ADMIN/editUser/EditUser'
import Users from '@/components/pages/ROLES/ADMIN/users/Users'
import { User } from '@/lib/types'

const user: User = {
	id: 'user_id_string',
	name: 'Тестовый юзер',
	email: 'admin@mail.ru',
	password: 'real_password',
	role: 'ADMIN',
	isActive: true,
	avatar: 'link_to_avatar',
}

export default function page() {
	return (
		<>
			<Users />
			<CreateUser />
			<EditUser user={user} />
		</>
	)
}
