import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, useTheme } from "@mui/material";
import AppSidebar from "components/app-side-bar";
import Breadcrumb from "components/breadcrumb";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./style.scss";

export const MainLayout = () => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [broken, setBroken] = useState<boolean>(false);
  const [sideBarWidth, setSideBarWidth] = useState(250);

  const theme = useTheme();

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [collapsed, document?.body?.clientWidth]);

  const handleResize = () => {
    if (collapsed) {
      setSideBarWidth(80);
    } else {
      setSideBarWidth(250);
    }
    if (document?.body?.clientWidth <= 768) setSideBarWidth(0);
  };

  return (
    <Box className="main-layout">
      <AppSidebar
        toggled={toggled}
        collapsed={collapsed}
        setToggled={setToggled}
        setCollapsed={setCollapsed}
        setBroken={setBroken}
      />
      <main
        style={{
          width: `calc(100vw - ${sideBarWidth}px`,
        }}
      >
        <Box className="header-layout">
          <Box className="h-full flex_center_between px-8">
            <Breadcrumb />
            <IconButton onClick={() => {}} title="Logout">
              <LogoutIcon
                sx={{
                  color: theme.palette.main.primary,
                  cursor: "pointer",
                }}
              />
            </IconButton>
          </Box>
          {broken && (
            <MenuIcon
              className="menu-collapse-icon"
              onClick={() => setToggled(!toggled)}
            />
          )}
        </Box>
        <Box>
          <Outlet />
        </Box>
      </main>
    </Box>
  );
};
