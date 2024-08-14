import {
  FormControl,
  IconButton,
  InputLabel,
  Select as MUISelect,
  MenuItem,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
  useTheme,
} from "@mui/material";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import React, { useMemo, useState } from "react";
import "./style.scss";
import { SelectProps } from "./select.type";
import { Controller } from "react-hook-form";
import { convertToRem } from "utils/convert-to-rem";

const SelectItem: React.FC<SelectProps> = ({
  items,
  minWidth,
  width,
  name,
  control,
  label,
  className,
  disabled,
  error,
  defaultValue,
  suggestPopover,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const themes = useTheme();
  const CustomWidthTooltip = useMemo(
    () =>
      styled(({ className, ...props }: TooltipProps) => (
        <Tooltip
          {...props}
          classes={{ popper: className }}
          placement="top-start"
          slotProps={{
            popper: {
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                  {
                    marginTop: "4px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                  {
                    marginBottom: "4px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
                  {
                    marginLeft: "4px",
                  },
                [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
                  {
                    marginRight: "4px",
                  },
              },
            },
          }}
        />
      ))({
        [`& .${tooltipClasses.tooltip}`]: {
          maxWidth: 600,
        },
      }),
    [open]
  );
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <FormControl className={`form-item ${className ?? ""}`}>
      {!!label && (
        <InputLabel
          shrink
          htmlFor={name}
          className={`static transform-none flex items-center pr-1 text-black max-w-full pb-2`}
        >
          {label}
          {required ? <span className="text-red-600">&nbsp;*</span> : ""}
          {!!suggestPopover && (
            <CustomWidthTooltip
              open={open && !!suggestPopover}
              onClose={handleClose}
              onOpen={handleOpen}
              title={
                <Typography className="py-1 px-2 whitespace-nowrap">
                  {suggestPopover}
                </Typography>
              }
            >
              <IconButton
                tabIndex={-1}
                className="ml-1 p-1 cursor-pointer"
                onClick={() => setOpen(!open)}
              >
                <ContactSupportIcon className="w-[16px] h-[16px]" />
              </IconButton>
            </CustomWidthTooltip>
          )}
        </InputLabel>
      )}
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <MUISelect
            value={value}
            onChange={onChange}
            displayEmpty
            error={!!error}
            sx={{
              "&>.MuiSelect-select": {
                minWidth,
                width: convertToRem(120),
                paddingLeft: convertToRem(16),
                paddingRight: 0,
                color: themes.palette.main.black,
              },
            }}
            MenuProps={{
              sx: {
                boxShadow: "0 8px 20px -5px #d9d9d9",
                borderRadius: convertToRem(8),
                ul: {
                  maxHeight: convertToRem(500),
                  p: 2,
                },
                li: {
                  p: 1,
                  borderRadius: convertToRem(4),
                  "&:hover": {
                    backgroundColor: "rgba(201, 156, 51, 0.2)",
                  },
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                },
                ".Mui-selected": {
                  backgroundColor: themes.palette.main.primary,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: themes.palette.main.primary,
                    color: "black",
                  },
                },
              },
            }}
            disabled={disabled}
            renderValue={(selected: any) => {
              if (!selected) {
                return <em>All</em>;
              }
              return (
                items?.find((item) => item?.value === selected)?.label ?? ""
              );
            }}
          >
            {items?.length ? (
              items.map((item) => (
                <MenuItem
                  value={item.value}
                  key={item.value}
                  className="aria-selected:bg-red"
                >
                  <Typography variant="inherit" noWrap title={item.label}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))
            ) : (
              <Typography variant="subtitle2">No Data</Typography>
            )}
          </MUISelect>
        )}
      />
      {!!error?.message && (
        <p className="MuiFormHelperText-root Mui-error">
          {String(error?.message)}
        </p>
      )}
    </FormControl>
  );
};

export default SelectItem;
