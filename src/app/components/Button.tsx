import React, { FC, ComponentPropsWithoutRef, MouseEvent } from "react";
import { TStyleMap } from "../../types/status";


export type TButtonActionType = "edit"
export type TButtonType = "is-primary" | "is-secondary"

const buttonClassMap: TStyleMap<TButtonActionType, TButtonType> = {
    'edit': 'is-primary',
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    onClick?: (e?: MouseEvent) => void
    label?: string;
    icon?: React.ReactNode;
    actionType?: TButtonActionType
    fullWidth?: boolean;
    children?: React.ReactNode
    disabled?: boolean
};

const Button: FC<ButtonProps> = ({ onClick, label, icon, actionType, children, fullWidth = false, disabled = false }): JSX.Element => {

    const btnTypeClassName = actionType ? buttonClassMap[actionType] : 'is-primary'

    const btnIcon = icon ?? ""
    const innerNode = (children ?? `${btnIcon}${label}`)
    return (
        <button className={`button ${btnTypeClassName} ${fullWidth ? 'full-width' : ""}`}
            onClick={onClick} disabled={disabled}>
            {innerNode}
        </button>
    )
};

export default Button;