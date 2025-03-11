import useDeleteCategory from '@/lib/hooks/reactQuery/categories/useDeleteCategory'

export default function DeleteCategoryButton({
	categoryId,
}: {
	categoryId: string | undefined
}) {
	const mutation = useDeleteCategory()
	return (
		<button
			onClick={() => {
				mutation.mutate({ categoryId })
			}}
		>
			Удалить
		</button>
	)
}
