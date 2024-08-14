import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { RootState } from "app/store";
import { useSelector } from "react-redux";

const LoadingCustom = () => {
  const _isLoading = useSelector((state: RootState) => state.loading);
  const theme = useTheme();

  return (
    <Backdrop
      sx={{
        color: theme.palette.main.white,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={_isLoading.loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingCustom;
