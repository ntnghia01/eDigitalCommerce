import { Box, Grid, TextField } from "@mui/material";

import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function AdminTopBar() {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                    <TextField id="outlined-basic" label="Tìm kiếm" variant="outlined" style={{width: '100%'}}/>
                    </Grid>
                    <Grid item xs={6} md={4} container
  direction="row"
  justifyContent="flex-end"
  alignItems="center" >
                    <DarkModeIcon />
                    <SettingsIcon />
                    <AccountCircleIcon />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
