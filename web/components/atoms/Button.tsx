import type { FC } from 'react'

export interface ButtonProps {
    text: string
    size?: 'sm' | 'md' | 'lg'
}

type ButtonMap = {
    [key: string]: {
        class: string
    }
}

const buttonMap: ButtonMap = {
    ['sm']: {
        class: 'text-sm py-1 px-4',
    },
    ['md']: {
        class: 'text-sm py-2 px-5',
    },
    ['lg']: {
        class: 'font-medium text-lg py-3 px-10',
    },
}

const Button: FC<ButtonProps> = ({ text, size = 'lg' }) => {
    const buttonStyling = buttonMap[size]

    return (
        <span
            className={`bg-green-primary mx-auto md:mx-0 text-white rounded-full cursor-pointer ${buttonStyling.class}`}
        >
            {text}
        </span>
    )
}

export default Button
