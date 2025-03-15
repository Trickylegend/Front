import { z } from 'zod'

export interface LoginPayload {
	email: string
	password: string
}

export interface RegistrationPayload {
	name: string
	email: string
	password: string
}

export const registrationSchema = z.object({
	name: z.string(),
	email: z.string().email('Почта обязательна'),
	password: z.string().min(8, 'Минимальное количество символов - 8'),
})

export const loginSchema = z.object({
	email: z.string().email('Почта обязательна'),
	password: z.string().min(8, 'Минимальное количество символов - 8'),
})
