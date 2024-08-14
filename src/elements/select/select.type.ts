import { OptionDropdownProps } from "types/common.interface";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface SelectProps {
  items: OptionDropdownProps[];
  minWidth?: number;
  width?: number;
  className?: string;
  label?: string;
  name: string;
  control: any;
  disabled?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  defaultValue?: number | string;
  suggestPopover?: string;
  required?: boolean;
}
