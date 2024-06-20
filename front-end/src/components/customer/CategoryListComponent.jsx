import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryIcon from '@mui/icons-material/Category';
import { Grid, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories, fetchCategoriesAvailable } from "../../slices/categorySlice";
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopIcon from '@mui/icons-material/Laptop';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TabletIcon from '@mui/icons-material/Tablet';
import Battery0BarIcon from '@mui/icons-material/Battery0Bar';
import MonitorIcon from '@mui/icons-material/Monitor';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import CableIcon from '@mui/icons-material/Cable';
import UsbIcon from '@mui/icons-material/Usb';
import SdCardIcon from '@mui/icons-material/SdCard';
import { fetchBrands } from "../../slices/brandSlice";
import { useNavigate } from "react-router-dom";


export default function CategoryListComponent() {
    console.log("check render");
  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchCategoriesAvailable());
  },[dispatch])

  const categories = useSelector((state) => state.categories.categories)
  console.log(categories);

  return (
    <Box sx={{marginTop: 4}}>
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

            {categories && (
              categories.slice(0,10).map((category) => (
                <BottomNavigationAction key={category.cateId} label={category.cateName} icon={<img src={category.cateImage} alt="" style={{width: "30%", height: "50%"}} />} onClick={()=>navigate(`/category/${category.cateId}`)}/>
              ))
            )}

            {/* <BottomNavigationAction label="Điện thoại" icon={<PhoneAndroidIcon />} />
            <BottomNavigationAction label="Laptop" icon={<LaptopIcon />} />
            <BottomNavigationAction label="Tai nghe" icon={<HeadphonesIcon />} />
            <BottomNavigationAction label="Máy tính bảng" icon={<TabletIcon />} />
            <BottomNavigationAction label="Sạc" icon={<Battery0BarIcon />} />
            <BottomNavigationAction label="Màn hình" icon={<MonitorIcon />} />
            <BottomNavigationAction label="Máy in" icon={<AdfScannerIcon />} />
            <BottomNavigationAction label="Cáp" icon={<CableIcon />} />
            <BottomNavigationAction label="USB" icon={<UsbIcon />} />
            <BottomNavigationAction label="Thẻ nhớ" icon={<SdCardIcon />} /> */}

          </BottomNavigation>
        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
      </Grid>
    </Box>
  );
}
