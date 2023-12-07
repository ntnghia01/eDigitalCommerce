import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import "../../../public/avatar.png";

export default function AdminTopBar() {
  const { mode, setMode } = useColorScheme();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("adminID");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminToken");

    handleCloseUserMenu();
    navigate("/admin/login")
  };



  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <SearchIcon
                sx={{ color: "action.active", mr: 1, my: 0.5, fontSize: 40 }}
              />
              <TextField
                id="input-with-sx"
                label="Tìm kiếm"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Box>

            {/* <TextField
              id="outlined-basic"
              label="Tìm kiếm"
              variant="outlined"
              style={{ width: "100%" }}
            /> */}
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" spacing={3}>
              {/* <Tooltip title="Dark mode"> */}
              {mode === "light" ? (
                <DarkModeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                />
              ) : (
                <LightModeOutlinedIcon
                  style={{ cursor: "pointer" }}
                  fontSize="large"
                  onClick={() => {
                    setMode(mode === "light" ? "dark" : "light");
                  }}
                />
              )}
              {/* </Tooltip> */}
              <Tooltip title="Thông báo">
                <Badge color="secondary" badgeContent={3}>
                  <NotificationsActiveOutlinedIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  />
                </Badge>
              </Tooltip>
              <Tooltip title="Cài đặt">
                <Badge color="secondary" variant="dot">
                  <SettingsOutlinedIcon
                    style={{ cursor: "pointer" }}
                    fontSize="large"
                  />
                </Badge>
              </Tooltip>

              <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
                <Tooltip title="Tài khoản">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, marginLeft: 1 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src="../../../public/avar.jpg"
                      style={{ cursor: "pointer" }}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/admin/information");
                        handleCloseUserMenu();
                      }}
                    >
                      Thông tin cá nhân
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSignout()}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
