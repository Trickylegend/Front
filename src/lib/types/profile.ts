import { z } from 'zod'

export interface Profile {
	name: string
	email: string
	password: string
	avatar: string
}

export interface ProfileEdit {
	name: string
	avatar?: File[]
}

export interface ProfileBasic {
	name: string
	avatar: string
}

export interface ResetPasswordProfile {
	oldPassword: string
	newPassword: string
	repeatNewPassword: string
}

export const editProfileSchema = z.object({
	name: z.string(),
	avatar: z.preprocess(val => {
		return val instanceof FileList ? Array.from(val) : val
	}, z.array(z.instanceof(File)).optional()),
})

export const resetPasswordSchema = z
	.object({
		oldPassword: z.string().min(8, 'Введите корректный пароль!'),
		newPassword: z.string().min(8, 'Минимальное количество символов - 8'),
		repeatNewPassword: z.string().min(8, 'Минимальное количество символов - 8'),
	})
	.superRefine(({ newPassword, repeatNewPassword }, ctx) => {
		if (newPassword !== repeatNewPassword) {
			ctx.addIssue({
				path: ['repeatNewPassword'],
				message: 'Пароли должны совпадать!',
				code: 'custom',
			})
		}
	})
