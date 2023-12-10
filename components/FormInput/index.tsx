import React from "react";

interface IFormInput {
  type?: string
  title?: string
  name?: string
  onChange?: (e: any) => void
}

function FormInput({ type, title, onChange, name }: IFormInput) {
  return (
    <div>
      <p>{title ?? "undefined"}</p>
      <input name={name ?? "undefined"} type={type ?? "text"} onChange={onChange ?? (() => { })} />
    </div>
  );
}
export default FormInput;
