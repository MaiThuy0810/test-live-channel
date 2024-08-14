import styled from "@emotion/styled";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Box, Typography, useTheme } from "@mui/material";
import { sidebarConfig } from "constants/sidebar";
import {
  Menu,
  MenuItem,
  MenuItemStyles,
  Sidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { convertToRem } from "utils/convert-to-rem";

// hex to rgba converter
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

export const AppSidebar = ({
  collapsed,
  toggled,
  setToggled,
  setCollapsed,
  setBroken,
}: {
  collapsed: boolean;
  toggled: boolean;
  setCollapsed: (toggled: boolean) => void;
  setToggled: (toggled: boolean) => void;
  setBroken: (broken: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation()?.pathname;
  const theme = useTheme();

  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: convertToRem(13),
      fontWeight: 400,
    },
    SubMenuExpandIcon: {
      color: theme.palette.main.primary,
      "&:hover": {
        color: theme.palette.main.white,
      },
    },
    subMenuContent: ({ level }: { level: number }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(theme.palette.main.primary, !collapsed ? 0.05 : 1)
          : "transparent",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: theme.palette.main.primary,
      },
      "&:hover": {
        backgroundColor: theme.palette.main.primary,
        color: theme.palette.main.white,
      },
    },
  };

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      breakPoint="md"
    >
      <Box className="sidebar-menu-content">
        <Box className="sidebar-header">
          <StyledSidebarHeader>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
              }}
              onClick={() => navigate("/")}
            >
              <Typography
                variant="h6"
                sx={{
                  marginLeft: convertToRem(8),
                  whiteSpace: "nowrap",
                  fontWeight: 700,
                  color: theme.palette.main.primary,
                }}
              >
                Logo
              </Typography>
            </Box>
          </StyledSidebarHeader>
        </Box>
        <Menu menuItemStyles={menuItemStyles}>
          {sidebarConfig?.map((sidebar) =>
            sidebar?.child?.length ? (
              <SubMenu
                onClick={() => navigate(sidebar?.path)}
                key={sidebar?.id}
                label={sidebar?.title}
                icon={sidebar?.icon}
              >
                {sidebar?.child?.map((item) => (
                  <MenuItem
                    onClick={() => navigate(item?.path)}
                    key={item?.id}
                    active={location.includes(item?.path)}
                  >
                    {item?.title}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                key={sidebar?.id}
                onClick={() => navigate(sidebar?.path)}
                active={location.includes(sidebar?.path)}
                icon={sidebar?.icon}
              >
                {sidebar?.title}
              </MenuItem>
            )
          )}
        </Menu>
      </Box>
      <Box className="sidebar-footer">
        {collapsed ? (
          <Box className="sidebar-footer-closed sidebar-footer-content">
            <MenuIcon onClick={() => setCollapsed(false)} />
          </Box>
        ) : (
          <Box className="sidebar-footer-collapse sidebar-footer-content">
            <MenuOpenIcon onClick={() => setCollapsed(true)} />
          </Box>
        )}
      </Box>
    </Sidebar>
  );
};
