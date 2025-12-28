import { InputHTMLAttributes } from "react";
import { inputclass, lblClass } from "../styling/styles";
import { FieldValues, UseFormRegister } from "react-hook-form";

type SettingInputProps = {
    label: string;
    id: string;
    type: string;
    defaultValue?: string | number | readonly string[] | undefined;
    register: UseFormRegister<FieldValues>;
} & InputHTMLAttributes<HTMLInputElement>;

export const SettingInput = (props: SettingInputProps) => {

    const { label, id, defaultValue, type, register } = props;

    return (
        <div className={`flex flex-col`}>
            <label htmlFor={id} className={lblClass}>
                {label}
            </label>
            <input
                defaultValue={defaultValue}
                type={type}
                id={id}
                {...register(id)}
                className={inputclass}
            />
        </div>)
}