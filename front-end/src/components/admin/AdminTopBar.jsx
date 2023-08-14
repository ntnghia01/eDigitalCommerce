import { Box, Grid, TextField } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Stack from "@mui/material/Stack";

export default function AdminTopBar() {
  const { mode, setMode } = useColorScheme();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <TextField
              id="outlined-basic"
              label="Tìm kiếm"
              variant="outlined"
              style={{ width: "100%" }}
            />
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
            <Stack direction="row" spacing={2}>
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
                <NotificationsActiveOutlinedIcon style={{ cursor: "pointer" }} fontSize="large" />
                <SettingsOutlinedIcon style={{ cursor: "pointer" }} fontSize="large" />
                <AccountCircleOutlinedIcon style={{ cursor: "pointer" }} fontSize="large" />
            </Stack>
            
            
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
