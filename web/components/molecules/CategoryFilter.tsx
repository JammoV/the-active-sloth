import type { FC } from 'react'
import React from 'react'

import type { ICategory } from '@/api/Types'

interface CategoryFilterProps {
    categories: ICategory[]
    activeCategory: ICategory | null
    clickHandler: (category: ICategory) => void
}

const CategoryFilter: FC<CategoryFilterProps> = ({
    categories,
    activeCategory,
    clickHandler,
}) => {
    return (
        <div className="flex flex-wrap md:flex-row justify-center mb-8">
            <span className="font-medium pr-2">Filter op:</span>
            {categories.map((category: ICategory) => (
                <span
                    key={category.title}
                    className={`px-2 cursor-pointer hover:underline ${
                        category._id === activeCategory?._id
                            ? 'bg-orange rounded-full'
                            : ''
                    } `}
                    onClick={(): void => clickHandler(category)}
                >
                    {category.title}
                </span>
            ))}
        </div>
    )
}

export default CategoryFilter
