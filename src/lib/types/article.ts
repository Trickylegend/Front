import { z } from 'zod'

export interface Article {
	id: string
	title: string
	description: string
	isActive: boolean
	preview?: string
}

export interface ArticleCreate {
	title: string
	description: string
	preview?: File[]
}

export interface ArticleEdit {
	id: string
	title: string
	description: string
	preview?: File[]
}

export const articleCreateSchema = z.object({
	title: z.string().min(1, 'Введите заголовок'),
	description: z.string().min(1, 'Заполните описание'),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})

export const articleEditSchema = z.object({
	id: z.string().optional(),
	title: z.string().min(1, 'Введите заголовок'),
	description: z.string().min(1, 'Заполните описание'),
	preview: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})
