import { z } from 'zod'

export type ServiceStatus = 'required' | 'notRequired' | 'inService'

export interface Transport {
	id: string
	name: string
	description: string
	price: number
	categoryId: string
	isActive: boolean
	serviceStatus: ServiceStatus
	serviceStandard?: number
	usageQuantity?: number
	preview?: string
}

export interface TransportCreate {
	name: string
	description: string
	price: number
	categoryId: string
	isActive?: boolean
	serviceStandard?: number
	usageQuantity?: number
	preview?: File[]
}

export interface TransportEdit {
	id: string
	name: string
	description: string
	price: number
	categoryId: string
	isActive: boolean
	serviceStatus: ServiceStatus
	serviceStandard?: number
	usageQuantity?: number
	preview?: File[]
}

export const transportCreateSchema = z.object({
	name: z.string().min(1, 'Введите название'),
	description: z.string().optional().default(''),
	price: z.coerce.number().min(0, 'Введите цену'),
	categoryId: z.string().min(1, 'Выберите категорию'),
	isActive: z.boolean().default(false),
	serviceStandard: z.coerce
		.number()
		.min(0, 'Минимальное значение 0')
		.optional()
		.default(0),
	usageQuantity: z.coerce
		.number()
		.min(0, 'Минимальное значение 0')
		.optional()
		.default(0),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})

export const transportEditSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Введите название'),
	description: z.string().optional().default(''),
	price: z.coerce.number().min(0, 'Введите цену'),
	categoryId: z.string().min(1, 'Выберите категорию'),
	isActive: z.boolean().default(false),
	serviceStandard: z.coerce
		.number()
		.min(0, 'Минимальное значение 0')
		.optional()
		.default(0),
	usageQuantity: z.coerce
		.number()
		.min(0, 'Минимальное значение 0')
		.optional()
		.default(0),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})
