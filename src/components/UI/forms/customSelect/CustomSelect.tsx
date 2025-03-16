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
		<div className={styles.selectContainer}>
			{label && (
				<label htmlFor={name} className={styles.label}>
					{label}
				</label>
			)}
			<div className={styles.customSelectWrapper}>
				<select
					id={name}
					{...register(name)}
					{...rest}
					className={styles.select}
				>
					{children}
				</select>
				<span className={styles.customArrow}></span>
			</div>
			{errors[name] && (
				<div className={styles.error}>{errors[name]?.message as string}</div>
			)}
		</div>
	)
}
