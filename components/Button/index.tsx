import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import style from "./style.module.css";
interface IButton {
  type?: ButtonHTMLAttributes<HTMLButtonElement>;
  title?: string;
  disabled?: boolean;
  name?: string;
  children: any;
  onChange?: (e: any) => void;
  onClick?: () => void;
}

function Button({
  type,
  children,
  onChange,
  name,
  onClick,
  disabled,
}: IButton) {
  return (
    <>
      <button
        onClick={onClick}
        type={"button"}
        disabled={disabled ?? false}
        className={`bg-slate-600 px-3 py-2 rounded-md text-white ${
          disabled ? `${style.disabled}` : ""
        }`}
      >
        {children}
      </button>
    </>
  );
}
export default Button;
