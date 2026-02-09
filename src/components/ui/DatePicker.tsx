import React from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse, isValid } from "date-fns";
import { DATE_FORMAT } from "@/utils/constant";

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  min?: string;
  className?: string;
  labelStyle?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = "mm/dd/yyyy",
  required = false,
  error,
  disabled = false,
  min,
  className = "",
  labelStyle
}) => {
  const cutoffDate = new Date("2009-12-31");

  const parsedValue =
    value && value.trim() !== ""
      ? parse(value, DATE_FORMAT, new Date())
      : null;

  const safeValue = parsedValue && isValid(parsedValue) ? parsedValue : null;

  return (
    <div className={`space-y-3 ${className}`}>
      <label
        htmlFor={name}
        className={`block text-theme-foreground ${labelStyle}`}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <DatePickerLib
        id={name}
        selected={safeValue}
        onChange={(date: Date | null) => {
          if (date && isValid(date)) {
            onChange(format(date, DATE_FORMAT));
          } else {
            onChange("");
          }
        }}
        dateFormat={DATE_FORMAT} 
        placeholderText={placeholder}
        required={required}
        disabled={disabled}
        minDate={min ? new Date(min) : undefined}
        maxDate={cutoffDate}
        wrapperClassName="max-w-[800px] w-full"
        className={`
          max-w-[800px] w-full px-3 py-2 border-t-0 border-b-1 rounded-md transition-colors
          bg-theme-background text-theme-foreground 
          border-theme-border focus:border-theme-primary focus:ring-2 focus:ring-theme-primary/20
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""}
        `}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default DatePicker;

