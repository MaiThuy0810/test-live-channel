import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import styles from "./input.module.scss";
import { formatPhoneNumber } from "utils/format-phone-number";
import { setMaxLength } from "utils/set-max-length";
import { convertToRem } from "utils/convert-to-rem";
import { formatScale } from "utils/format-scale";
import { formatCurrency } from "utils/format-currency";

const phoneNumberReplaceRegex =
  /[(a-zA-Z)(?=.*!@#$%^&*()+_/;:"'/?>.,<[{}\])ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;

const Input: React.FC<any> = ({
  label,
  inputSize = "lg",
  name,
  control,
  startAdornment,
  endAdornment,
  type,
  height = 56,
  width = "100%",
  inputProps,
  customStyle = "",
  onKeyDown,
  onInputChange,
  placeholder,
  containerStyle = "",
  radius = 4,
  disabled,
  register,
  multiline,
  rows,
  maxRows,
  helper,
  id,
  sx,
  startAdornmentFocused,
  isSuccess,
  ...rest
}: any) => {
  const theme = useTheme();
  const [focused, setFocused] = useState<boolean>(false);

  const getInputEffect = (appearance: string): any => {
    switch (appearance) {
      case "solid":
        return {
          "&.Mui-focused": {
            borderColor: theme.palette.button.neutral.border + " !important",
            background: theme.palette.button.neutral.bg + " !important",
            color: theme.palette.button.neutral.label + " !important",
          },
          "&.Mui-disabled": {
            background: theme.palette.main_grey.gray600 + " !important",
            color: theme.palette.main_grey.gray500 + " !important",
          },
        };
      case "search":
        return {
          "&.Mui-focused": {
            border: "1px solid #e61973",
            background: "#fff",
            boxShadow: "0px 0px 0px 2px rgba(230, 25, 115, 0.2)",
          },
          "&.Mui-disabled": {
            border: "1px solid #f1f2f3 !important",
            background: "#f1f2f3 !important",
          },
        };
    }
  };

  return (
    <FormControl
      variant="outlined"
      className={`${styles.form_control} ${containerStyle}`}
      sx={{
        width: convertToRem(width),
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { invalid, isTouched, isDirty, error },
        }) => (
          <>
            <OutlinedInput
              disabled={disabled}
              onFocus={() => {
                setFocused(true);
              }}
              onBlurCapture={() => {
                setFocused(false);
              }}
              id={id || name}
              // Fix warning: A component is changing an uncontrolled input of type text to be controlled
              value={(typeof value === "object" ? value?.name : value) ?? ""}
              onChange={(event) => {
                const caret = event.target.selectionStart;
                const element = event.target;

                window.requestAnimationFrame(() => {
                  element.selectionStart = caret;
                  element.selectionEnd = caret;
                });

                if (onInputChange) {
                  onInputChange(event.target.value);
                }

                onChange(event.target.value);
              }}
              placeholder={placeholder}
              startAdornment={
                startAdornment || startAdornmentFocused ? (
                  <InputAdornment position="start">
                    {(focused || Boolean(value)) && startAdornmentFocused
                      ? startAdornmentFocused
                      : startAdornment}
                  </InputAdornment>
                ) : undefined
              }
              endAdornment={
                isSuccess === true ? (
                  <InputAdornment className={styles.visibility} position="end">
                    {/* <CheckRoundIcon /> */}
                  </InputAdornment>
                ) : endAdornment ? (
                  endAdornment
                ) : undefined
              }
              {...(register &&
                register(name, {
                  onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const caret = event.target.selectionStart;
                    const element = event.target;

                    if (value && value.length > event.target.value.length) {
                      window.requestAnimationFrame(() => {
                        element.selectionStart = caret;
                        element.selectionEnd = caret;
                      });
                    }

                    if (onInputChange) {
                      onInputChange(event.target.value);
                    }
                  },
                  setValueAs: (v: any) =>
                    type === "tel"
                      ? formatPhoneNumber(
                          v.replace(phoneNumberReplaceRegex, "")
                        )
                      : name === "budget" && type === "text"
                        ? formatCurrency(v.replace(phoneNumberReplaceRegex, ""))
                        : name === "scale" && type === "text"
                          ? formatScale(v.replace(phoneNumberReplaceRegex, ""))
                          : name === "businessNumber" && type === "text"
                            ? v.replace(phoneNumberReplaceRegex, "")
                            : inputProps?.maxLength
                              ? setMaxLength(v, inputProps?.maxLength)
                              : v,
                }))}
              inputProps={{
                autoComplete: "off",
                maxLength: type === "tel" ? 13 : name === "otp" ? 6 : undefined,
                ...inputProps,
              }}
              className={`${styles.input_custom} ${customStyle} ${disabled && styles.disabled}`}
              type={type}
              sx={{
                ...getInputEffect("solid"),
                borderColor: error
                  ? theme.palette.main.danger + " !important"
                  : "inherit",
                boxShadow: error ? "none !important" : "inherit",
                height: rest.multiline ? "auto" : "inherit",
                "&.MuiInputBase-root.MuiOutlinedInput-root": {
                  transition: "0.3s",
                  padding: "0 16px",
                  height: convertToRem(56),
                  background: theme.palette.main_grey.gray700,
                  color:
                    focused ||
                    (Boolean(value) && theme.palette.main_grey.gray100),
                  // : theme.palette.main.gray30 + ' !important',
                  "& input::placeholder": {
                    color: "main_grey.gray300",
                    opacity: 0.6,
                  },
                  "&.Mui-disabled": {
                    color: "main_grey.gray500",
                  },
                  "&.Mui-focused": {
                    borderColor: `${error ? theme.palette.main.danger : theme.palette.main_grey.gray500} !important`,
                  },
                },
                ...sx,
              }}
              multiline={multiline}
              rows={rows}
              maxRows={maxRows}
              onKeyDown={(e) => {
                if (onKeyDown) onKeyDown(e);
              }}
            />
            {Boolean(error) ? (
              <Typography>{error?.message || ""}</Typography>
            ) : helper && !isTouched ? (
              <Typography>{helper}</Typography>
            ) : null}
          </>
        )}
      />
    </FormControl>
  );
};

export default Input;
