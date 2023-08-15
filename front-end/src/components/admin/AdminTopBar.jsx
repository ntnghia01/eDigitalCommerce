import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  TextField,
  Tooltip,
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

import "../../../public/avatar.png";

export default function AdminTopBar() {
  const { mode, setMode } = useColorScheme();

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


              <Tooltip title="Tài khoản">
                <Avatar
                  alt="Remy Sharp"
                  src="../../../public/avar.jpg"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
