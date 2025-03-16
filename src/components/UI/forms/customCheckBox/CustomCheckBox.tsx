'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './CustomCheckBox.module.scss'

type CustomCheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	label?: string
}

export default function CustomCheckBox({
	name,
	label,
	...rest
}: CustomCheckBoxProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div className={styles.checkboxContainer}>
			<label className={styles.checkboxLabel}>
				<input
					type='checkbox'
					{...register(name)}
					{...rest}
					className={styles.checkboxInput}
				/>
				<span className={styles.customCheckbox}></span>
				{label && <span className={styles.checkboxText}>{label}</span>}
			</label>
			{errors[name] && (
				<div className={styles.error}>{errors[name]?.message as string}</div>
			)}
		</div>
	)
}
