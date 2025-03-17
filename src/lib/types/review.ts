import { z } from 'zod'

export type Author = {
	id: string
	name: string
	isActive: boolean
	avatar?: string
}

export interface Review {
	id: string
	description: string
	rating: number
	isActive: boolean
	author: Author
}

export interface ReviewCreate {
	description: string
	rating: number
}

export interface ReviewEdit {
	id: string
	isActive: boolean
}

export const reviewCreateSchema = z.object({
	description: z.string().min(1, 'Заполните отзыв'),
	rating: z.coerce.number().min(1).max(5, 'Укажите рейтинг'),
})

export const reviewEditSchema = z.object({
	id: z.string().optional(),
	isActive: z.boolean(),
})
