import { jwtVerify } from 'jose'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import { NextRequest, NextResponse } from 'next/server'

export const ROLES = {
	GUEST: 'GUEST',
	USER: 'USER',
	ADMIN: 'ADMIN',
	MANAGER: 'MANAGER',
	SERVICE_MANAGER: 'SERVICE_MANAGER',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROUTE_TYPES = {
	PUBLIC: 'public',
	PROTECTED: 'protected',
	ADMIN: 'admin',
	MANAGER: 'manager',
	SMANAGER: 'smanager',
} as const

export type RouteType = (typeof ROUTE_TYPES)[keyof typeof ROUTE_TYPES]

export const routeAccessConfig: Record<RouteType, Role[]> = {
	[ROUTE_TYPES.PUBLIC]: [
		ROLES.GUEST,
		ROLES.USER,
		ROLES.ADMIN,
		ROLES.MANAGER,
		ROLES.SERVICE_MANAGER,
	],
	[ROUTE_TYPES.PROTECTED]: [
		ROLES.USER,
		ROLES.ADMIN,
		ROLES.MANAGER,
		ROLES.SERVICE_MANAGER,
	],
	[ROUTE_TYPES.ADMIN]: [ROLES.ADMIN],
	[ROUTE_TYPES.MANAGER]: [ROLES.MANAGER],
	[ROUTE_TYPES.SMANAGER]: [ROLES.SERVICE_MANAGER],
}

export const urlRouteTypeMap: Record<string, RouteType> = {
	'/': ROUTE_TYPES.PUBLIC,
	'/login': ROUTE_TYPES.PUBLIC,
	'/dashboard': ROUTE_TYPES.PROTECTED,
	'/profile': ROUTE_TYPES.PROTECTED,
	'/admin': ROUTE_TYPES.ADMIN,
	'/manager': ROUTE_TYPES.MANAGER,
	'/smanager': ROUTE_TYPES.SMANAGER,
}

export function hasAccess(userRole: Role, routeType: RouteType): boolean {
	const allowedRoles = routeAccessConfig[routeType]
	return allowedRoles.includes(userRole)
}

export function checkUrlAccess(userRole: Role, url: string): boolean {
	const routeType = urlRouteTypeMap[url] || ROUTE_TYPES.PUBLIC
	return hasAccess(userRole, routeType)
}

export async function getUserRole(
	cookies: ReadonlyRequestCookies,
	encodedKey: Uint8Array
): Promise<Role> {
	type Payload = {
		id: string
		role: Role
	}
	const refreshToken = cookies.get('refreshToken')?.value
	let accessToken = cookies.get('accessToken')?.value

	if (!accessToken && refreshToken) {
		try {
			accessToken = await fetchAccessTokenFromAPI(refreshToken)
		} catch (error) {
			console.error('Ошибка получения нового accessToken', error)
			return ROLES.GUEST
		}
	}

	if (!accessToken) return ROLES.GUEST

	try {
		const { payload } = (await jwtVerify(accessToken, encodedKey, {
			algorithms: ['HS256'],
		})) as { payload: Payload }
		return payload.role
	} catch (error) {
		console.error('Ошибка верификации токена', error)
		return ROLES.GUEST
	}
}

export async function checkAuthorization(
	request: NextRequest,
	userRole: Role
): Promise<NextResponse | null> {
	const { pathname } = request.nextUrl
	const routeType: RouteType = urlRouteTypeMap[pathname] || ROUTE_TYPES.PUBLIC

	if (userRole === ROLES.GUEST && routeType !== ROUTE_TYPES.PUBLIC) {
		return NextResponse.redirect(new URL('/login', request.nextUrl))
	}

	if (!hasAccess(userRole, routeType)) {
		return NextResponse.redirect(new URL('/access-denied', request.nextUrl))
	}

	return null
}

export async function updateAccessToken(
	cookies: ReadonlyRequestCookies,
	response: NextResponse
): Promise<NextResponse> {
	const refreshToken = cookies.get('refreshToken')?.value
	if (!refreshToken) {
		return response
	}

	if (!cookies.get('accessToken')) {
		const newAccessToken = await fetchAccessTokenFromAPI(refreshToken)
		response.headers.set(
			'Set-Cookie',
			`accessToken=${newAccessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`
		)
	}
	return response
}

export async function fetchAccessTokenFromAPI(
	refreshToken: string
): Promise<string> {
	try {
		const result = await fetch(
			`http://localhost:8080/api/token-test?refreshToken=${refreshToken}`
		)
		const data = await result.json()
		return data?.accessToken
	} catch (error) {
		console.error('Ошибка при вызове API токена:', error)
		throw error
	}
}
