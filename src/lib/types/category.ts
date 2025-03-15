import { z } from 'zod'

export interface Category {
	id: string
	name: string
	description: string
}

export interface CategoryCreate {
	name: string
	description: string
}

export interface CategoryEdit {
	id: string
	name: string
	description: string
}

export const categoryCreateSchema = z.object({
	name: z.string().min(1, 'Введите название'),
	description: z.string().min(1, 'Заполните описание'),
})

export const categoryEditSchema = z.object({
	id: z.string().optional(),
	name: z.string().min(1, 'Введите название'),
	description: z.string().min(1, 'Заполните описание'),
})
