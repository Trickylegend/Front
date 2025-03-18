import { z } from 'zod'

export interface Driver {
	id: string
	name: string
	description: string
	isActive: boolean
	avatar?: string
}

export interface DriverCreate {
	name: string
	description: string
	avatar?: File[]
}

export interface DriverEdit {
	id: string
	name: string
	description: string
	isActive: boolean
	avatar?: File[]
}

export const driverCreateSchema = z.object({
	name: z.string().min(1, 'Введите имя'),
	description: z.string().optional().default(''),
	avatar: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})

export const driverEditSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Введите имя'),
	description: z.string().optional().default(''),
	isActive: z.boolean().default(false),
	avatar: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})
