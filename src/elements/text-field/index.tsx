import { Box, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import "./style.scss";
import { ITextfieldHook } from "./textfield.type";
import { convertToRem } from "utils/convert-to-rem";

const TextFieldItem = ({ control, name, placeholder }: ITextfieldHook) => {
  return (
    <Box className="textfield-wrapper">
      <Controller
        name={name}
        control={control}
        defaultValue=""
        // rules={{ required: 'First name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            placeholder={placeholder}
            //   label="First Name"
            variant="outlined"
            // fullWidth
            margin="normal"
            sx={{
              width: "100%",
              input: {
                padding: convertToRem(11),
              },
              ".MuiInputBase-root": {
                borderRadius: convertToRem(10),
                background: "#80808026",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(0 0 0 / 0%)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(0 0 0 / 0%) !important",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(0 0 0 / 0%) !important",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default TextFieldItem;
