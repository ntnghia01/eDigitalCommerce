import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Card, CardMedia, Grid, Paper, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../slices/categorySlice";

export default function BrandListComponent() {
  console.log("check render");
  const [value, setValue] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.categories);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "white" }}
          style={{ paddingLeft: 0 }}
        >
          <BottomNavigation
            // showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {/* {categories.slice(0,10).map((category)=> (
                <BottomNavigationAction key={category.cateId} label={category.cateName} icon={<CategoryIcon />} />
            ))} */}
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2022/09/07/logoooooooooooooooo.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />

            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2020/09/14/brand (3).png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/06/12/rog.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2020/11/30/samsung-logo-transparent.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/07/18/xiaomi-logo.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/06/19/honor-logo-2022-svg.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/05/26/infinix-logo-svg.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2021/12/24/xorr.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2023/06/08/2560px-lg-logo-2015-svg.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />
            <BottomNavigationAction
              label="Apple"
              // classes={{ root: classes.root, label: classes.label }}
              icon={<img
                alt="Apple Logo"
                src="https://cdn.hoanghamobile.com/i/cat/Uploads/2020/11/07/logo-acer.png"
                style={{ width: "40px", height: "40px", objectFit: "contain" }}
              />}
            />

            </BottomNavigation>
        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
      </Grid>
    </Box>
  );
}
