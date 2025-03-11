import {
	checkAuthorization,
	getUserRole,
	updateAccessToken,
} from '@/lib/utils/middlewareUtils'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const secretKey = process.env.JWT_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)

export default async function middleware(request: NextRequest) {
	const response = NextResponse.next()
	const cookieStore = await cookies()

	const userRole = await getUserRole(cookieStore, encodedKey)

	const authResponse = await checkAuthorization(request, userRole)
	if (authResponse) return authResponse

	return await updateAccessToken(cookieStore, response)
}

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
	],
}
