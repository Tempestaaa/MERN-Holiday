import { TextareaHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: FieldError | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-1 w-full text-gray-700 font-bold">
        {label}
        <textarea
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

Textarea.displayName = "Textarea";

export default Textarea;
