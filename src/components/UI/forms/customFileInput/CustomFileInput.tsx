// CustomFileInput.tsx
'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styles from './CustomFileInput.module.scss'

type CustomFileInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	multiple?: boolean
}

export default function CustomFileInput({
	name,
	multiple = false,
	...rest
}: CustomFileInputProps) {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	const [filePreviews, setFilePreviews] = useState<string[]>([])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const urls = Array.from(files).map(file => URL.createObjectURL(file))
			setFilePreviews(urls)
		}
	}

	useEffect(() => {
		return () => {
			filePreviews.forEach(url => URL.revokeObjectURL(url))
		}
	}, [filePreviews])

	return (
		<div className={styles.inputContainer}>
			<input
				type='file'
				{...register(name, { onChange: handleFileChange })}
				multiple={multiple}
				className={styles.input}
				{...rest}
			/>
			{errors[name] && (
				<div className={styles.error}>{errors[name]?.message as string}</div>
			)}
			{filePreviews.length > 0 && (
				<div className={styles.previewContainer}>
					{filePreviews.map((src, index) => (
						<div key={index} className={styles.previewItem}>
							<Image
								src={src}
								alt={`Preview ${index + 1}`}
								className={styles.previewImage}
								width={70}
								height={70}
							/>
							<span>{`${name}${index + 1}`}</span>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
