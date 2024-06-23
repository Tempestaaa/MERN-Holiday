import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  error?: FieldError | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1 w-full text-gray-700 font-bold">
        {label}
        <input
          type={type}
          {...rest}
          ref={ref}
          className={`px-4 py-2 rounded-xl border-2 shadow-sm font-normal ${
            error && "border-red-500"
          }`}
        />
        {error && (
          <p className="text-xs text-red-500 font-bold">{error.message}</p>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
