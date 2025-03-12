'use server'
import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { TokenPayload, UserFromCookies } from '../types'

const secretKey = process.env.JWT_SECRET_KEY
if (!secretKey) {
	throw new Error('JWT_SECRET_KEY не задан в .env')
}
const encodedKey = new TextEncoder().encode(secretKey)

export async function logout() {
	const cookieStore = await cookies()
	cookieStore.delete({ name: 'accessToken', path: '/' })
	cookieStore.delete({ name: 'refreshToken', path: '/' })
}

export default async function getUserFromCookies(): Promise<UserFromCookies> {
	const result: UserFromCookies = {
		isAuth: false,
		role: null,
	}

	const cookieStore = await cookies()
	const token = cookieStore.get('accessToken')?.value

	if (!token) return result

	try {
		const { payload } = await jwtVerify<TokenPayload>(token, encodedKey, {
			algorithms: ['HS256'],
		})

		if (payload.id && payload.role) {
			return {
				isAuth: true,
				role: payload.role,
			}
		}
	} catch (error) {
		console.error('Ошибка верификации токена:', error)
	}

	return result
}
