import { z } from 'zod'

export type EntityType =
	| 'article'
	| 'category'
	| 'driver'
	| 'review'
	| 'transport'
	| 'user'

export interface DeleteType {
	id: string
}

export interface StatusType {
	id: string
	isActive: boolean
}

export const deleteSchema = z.object({
	id: z.string().min(1),
})

export const statusSchema = z.object({
	id: z.string().optional(),
	isActive: z.boolean(),
})

export const entityMap = {
	article: { capitalized: 'Article', plural: 'articles', idKey: 'articleId' },
	category: {
		capitalized: 'Category',
		plural: 'categories',
		idKey: 'categoryId',
	},
	driver: { capitalized: 'Driver', plural: 'drivers', idKey: 'driverId' },
	review: { capitalized: 'Review', plural: 'reviews', idKey: 'reviewId' },
	transport: {
		capitalized: 'Transport',
		plural: 'transports',
		idKey: 'transportId',
	},
	user: { capitalized: 'User', plural: 'users', idKey: 'userId' },
} as const
