import { SelectHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: number[];
  styles: string;
  error?: FieldError | undefined;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, styles, error, ...rest }, ref) => {
    return (
      <label
        className={`flex flex-col gap-1 w-full text-gray-700 font-bold ${styles}`}
      >
        {label}
        <select
          {...rest}
          ref={ref}
          className={`px-4 py-2 rounded-xl border-2 shadow-sm font-normal ${
            error && "border-red-500"
          }`}
        >
          {options?.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-xs text-red-500 font-bold">{error.message}</p>
        )}
      </label>
    );
  }
);

Select.displayName = "Select";

export default Select;
