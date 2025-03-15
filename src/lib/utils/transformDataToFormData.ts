export function transformDataToFormData<T extends Record<string, any>>(
	data: T,
	fileKeys: (keyof T)[] = []
): FormData {
	const formData = new FormData()
	Object.entries(data).forEach(([key, value]) => {
		if (fileKeys.includes(key as keyof T)) {
			if (Array.isArray(value)) {
				if (value.length === 1) {
					formData.append(key, value[0])
				} else if (value.length > 1) {
					value.forEach((file: File, index: number) => {
						formData.append(`${key}${index + 1}`, file)
					})
				}
			}
		} else {
			if (value !== undefined && value !== null) {
				formData.append(key, String(value))
			}
		}
	})
	return formData
}
