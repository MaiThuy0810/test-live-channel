import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { IDatePicker } from "./datepicker.type";

const DatePickerComponent: React.FC<IDatePicker> = ({
  value,
  setValue,
  text,
  width,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box ref={wrapperRef} className="datepicker-wrapper">
      <Box
        onClick={() => {
          setOpen(!open);
        }}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: width ?? "100%",
          background: "#80808026",
          padding: "8px",
          borderRadius: "0.5rem",
        }}
      >
        {/* <p className='text-field'>{dayjs(value).format('YYYY-MM-DD')}</p> */}
        <p className="text-field">
          {!dayjs(dayjs(value).format("YYYY-MM-DD")).isValid()
            ? text
            : dayjs(value).format("YYYY-MM-DD")}
        </p>
        {open ? (
          <KeyboardArrowUpIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
        ) : (
          <KeyboardArrowDownIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }} />
        )}
      </Box>

      {open && (
        <Box className="date-picker">
          <Box className="picker">
            <p className="text-show">
              {!dayjs(dayjs(value).format("YYYY-MM-DD")).isValid()
                ? dayjs().format("YYYY-MM-DD")
                : dayjs(value).format("YYYY-MM-DD")}
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDatePicker"]}>
                <DemoItem label="">
                  <StaticDatePicker
                    value={value}
                    onChange={(e) => {
                      setValue(e);
                      setOpen(false);
                    }}
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DatePickerComponent;
