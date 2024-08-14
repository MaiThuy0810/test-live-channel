import React from "react";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import { Box, Typography, useTheme } from "@mui/material";
import { convertToRem } from "utils/convert-to-rem";

const SortableHeader: React.FC<{
  isActive: boolean;
  sortDESC: boolean | null;
  children: string | JSX.Element;
}> = ({ sortDESC, children, isActive }) => {
  const theme = useTheme();

  return (
    <Box
      className="sortable-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <Typography className="font-extrabold text-mainColor text-[14px]">
        {children}
      </Typography>
      <Box className={"rotate-90"}>
        <KeyboardBackspaceRoundedIcon
          sx={{
            width: convertToRem("16px"),
            color: isActive
              ? sortDESC
                ? theme.palette.main.primary
                : "gray"
              : "gray",
          }}
        />
      </Box>
      <Box className={"-rotate-90"}>
        <KeyboardBackspaceRoundedIcon
          sx={{
            width: convertToRem("16px"),
            color: isActive
              ? sortDESC
                ? "gray"
                : theme.palette.main.primary
              : "gray",
          }}
        />
      </Box>
    </Box>
  );
};

export default SortableHeader;
