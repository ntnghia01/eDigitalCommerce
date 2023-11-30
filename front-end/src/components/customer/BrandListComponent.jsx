import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from "@mui/icons-material/Category";
import { CardMedia, Grid, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../slices/categorySlice";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LaptopIcon from "@mui/icons-material/Laptop";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import TabletIcon from "@mui/icons-material/Tablet";
import Battery0BarIcon from "@mui/icons-material/Battery0Bar";
import MonitorIcon from "@mui/icons-material/Monitor";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import CableIcon from "@mui/icons-material/Cable";
import UsbIcon from "@mui/icons-material/Usb";
import SdCardIcon from "@mui/icons-material/SdCard";

export default function BrandListComponent() {
  console.log("check render");
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "white" }}
          style={{ paddingLeft: 0 }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {/* {categories.slice(0,10).map((category)=> (
                <BottomNavigationAction key={category.cateId} label={category.cateName} icon={<CategoryIcon />} />
            ))} */}
            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2022/09/07/logoooooooooooooooo.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2020/09/14/brand (3).png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/06/12/rog.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2020/11/30/samsung-logo-transparent.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/07/18/xiaomi-logo.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/06/19/honor-logo-2022-svg.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/05/26/infinix-logo-svg.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>

            <Stack sx={{marginLeft: 8}}>
              <CardMedia
                sx={{ height: 200, maxWidth: 200 }}
                image="https://cdn.hoanghamobile.com/i/cat/Uploads/2021/12/24/xorr.png"
                title="green iguana"
                style={{ textAlign: "center" }}
              />
              <BottomNavigationAction label="Apple" />
            </Stack>


            </BottomNavigation>
        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
      </Grid>
    </Box>
  );
}
