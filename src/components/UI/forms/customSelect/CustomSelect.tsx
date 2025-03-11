'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './CustomSelect.module.scss'

type CustomSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	name: string
	label?: string
	children: React.ReactNode
}

export default function CustomSelect({
	name,
	label,
	children,
	...rest
}: CustomSelectProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={styles.field}>
			{label && <label htmlFor={name}>{label}</label>}
			<select id={name} {...register(name)} {...rest}>
				{children}
			</select>
			{errors[name] && (
				<div className={styles.error}>{errors[name]?.message as string}</div>
			)}
		</div>
	)
}
