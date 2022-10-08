import type { FC } from 'react'

export interface ButtonProps {
    text: string
}

const Button: FC<ButtonProps> = ({ text }) => {
    return (
        <span className="bg-green-primary/75 font-medium mx-auto md:mx-0 text-white rounded-full py-3 px-10 cursor-pointer hover:bg-green-primary">
            {text}
        </span>
    )
}

export default Button
