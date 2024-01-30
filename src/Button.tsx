import React, {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";

type DefaultButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type Props = DefaultButtonProps & {
    children: ReactNode
}

export const Button: React.FC<Props> =
    ({children, ...restProps}) => {

        return (
            <button {...restProps}>{children}</button>
        );
    }
;