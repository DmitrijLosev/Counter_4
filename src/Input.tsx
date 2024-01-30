import React, {DetailedHTMLProps, InputHTMLAttributes} from "react";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type InputPropsType = Omit<DefaultInputPropsType, "type" | "className"> & { errorMode: boolean };

export const Input: React.FC<InputPropsType> = ({
                                                    errorMode,
                                                    children,
                                                    ...restProps
                                                }) => {
    return (
        <label className="label">{children}
            <input type="number" className={errorMode ? "inputNum errorInput" : "inputNum"} {...restProps}/>
        </label>
    );
};

