'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './CustomInput.module.scss'

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
}

export default function CustomInput({ name, ...rest }: CustomInputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={styles.inputContainer}>
			<input {...register(name)} {...rest} className={styles.input} />
			{errors[name] && (
				<div className={styles.error}>{errors[name]?.message as string}</div>
			)}
		</div>
	)
}
