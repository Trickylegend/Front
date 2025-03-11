'use client'

import EditCategory from '@/components/pages/categoriesPage/editCategory/EditCategory'
import { useCategories } from '@/lib/hooks/reactQuery/categories/useCategories'
import { Category } from '@/lib/types'
import React from 'react'
import DeleteCategoryButton from './deleteCategoryButton/DeleteCategoryButton'

export default function Categories() {
	const { categories } = useCategories()
	const [activeCategory, setActiveCategory] = React.useState<
		Category | undefined
	>(undefined)

	return (
		<>
			<h2>Категории</h2>
			<ul>
				{categories?.map((category: Category) => (
					<div key={category.id}>
						<li
							onClick={() => {
								setActiveCategory(
									categories?.filter((el: Category) => el.id === category.id)[0]
								)
							}}
						>
							{category.name}
						</li>
						<DeleteCategoryButton categoryId={category.id} />
					</div>
				))}
			</ul>
			{activeCategory && <EditCategory category={activeCategory} />}
		</>
	)
}
