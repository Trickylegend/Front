import { z } from 'zod'

export type Role = 'USER' | 'ADMIN' | 'MANAGER' | 'SERVICE_MANAGER' | 'EDITOR'

export interface User {
	id: string
	name: string
	email: string
	password: string
	isActive: string
	role: Role
	avatar: string
}

export interface UserCreate {
	name: string
	email: string
	password: string
	role: Role
	avatar?: File[]
}

export interface UserEdit {
	id: string
	name: string
	email: string
	password?: string
	role: Role
	avatar?: File[]
}

export const userCreateSchema = z.object({
	name: z.string().min(1, 'Введите имя'),
	email: z.string().email('Неверный email'),
	password: z.string().min(6, 'Минимум 6 символов'),
	role: z.enum(['USER', 'ADMIN', 'MANAGER', 'SERVICE_MANAGER', 'EDITOR']),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})

export const userEditSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Введите имя'),
	email: z.string().email('Неверный email'),
	password: z.optional(z.string()),
	role: z.enum(['USER', 'ADMIN', 'MANAGER', 'SERVICE_MANAGER', 'EDITOR']),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})
