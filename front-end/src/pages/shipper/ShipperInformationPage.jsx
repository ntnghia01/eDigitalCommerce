import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Divider,
  Stack,
  Card,
  CardContent,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getCustomerInfo } from "../../../slices/customerSlice";
// import ConfirmDeleteAccountComponent from "../../../components/customer/personal/ConfirmDeleteAccountComponent";
import ConfirmDeleteAccountComponent from "../../components/customer/personal/ConfirmDeleteAccountComponent";

import { StyledBreadcrumb, VisuallyHiddenInput, Alert } from "../../components/customize/CustomizeComponent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { uploadAvatar } from "../../slices/accountSlice";
import EditInformationComponent from "../../components/customer/personal/EditInformationComponent";
import { getCustomerInfo } from "../../slices/customerSlice";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      // width: '30vh',
      // height: '30vh'
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

function convertMillisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng ngày và tháng để đảm bảo có hai chữ số
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Trả về chuỗi ngày/tháng/năm
  return `${formattedDay}-${formattedMonth}-${year}`;
}

export default function ShipperInformationPage() {
  console.log("chech render Shipper");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerInfo(localStorage.getItem("shipperID")));
  }, [dispatch]);
  const informations = useSelector((state) => state.customer.customer);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const handleOpenSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const [image, setImage] = useState();

  const handleSubmit = (e) => {
    // setImage(e.target.files[0]);
    console.log("call");
    e.preventDefault();
    const avatarData = {
      userId: localStorage.getItem("shipperID"),
      userImage: e.target.files[0].name,
      image: e.target.files[0],
    };
    console.log(avatarData);
    dispatch(uploadAvatar({userId: localStorage.getItem("shipperID"), avatarData: avatarData}))
      .then(() => {
        dispatch(getCustomerInfo(localStorage.getItem("shipperID")));
        handleOpenSuccessSnackbar();
        console.log("Cập nhật ảnh thành công!");
      })
      .catch((error) => {
        console.log("Cập nhật ảnh thất bại: " + error);
      });
  };

  return (
    <>
    <Paper sx={{marginTop: 3, padding: 3}}>

    
      <Grid container spacing={2} sx={{ padding: 6 }}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2} alignItems="center">
            {informations.userImage == null ? (
              <Avatar
                alt="Remy Sharp"
                src={`../../../public/avatar.png`}
                sx={{ width: "80%", height: "100%" }}
              />) : 
              <Avatar
                alt="Remy Sharp"
                src={`http://localhost:9004/api/product/images/${informations.userImage}`}
                sx={{ width: "80%", height: "100%" }}
              />
            }
            
            <Button variant="outlined" component="label">
              Thay ảnh đại diện
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  handleSubmit(e);
                }}
              />
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Thông tin tài khoản
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" gutterBottom>
              Tên tài khoản: {informations.userName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {informations.userEmail}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Số điện thoại: {informations.userPhone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Giới tính:{" "}
              {informations.userSex == 1
                ? "Nam"
                : informations.userSex == 2
                ? "Nữ"
                : "Khác"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ngày sinh: {convertMillisecondsToDate(informations.userBirthday)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Vai trò: Quản trị viên
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ngày tham gia: {informations.userCreatedAt}
            </Typography>
          </Stack>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom>
            Thông tin mua hàng
          </Typography>
          <Stack spacing={2}>
            <Typography variant="body1" gutterBottom>
              Số lượng đơn hàng đã đặt: 3
            </Typography>
            <Typography variant="body1" gutterBottom>
              Số lượng bình luận: 3
            </Typography>
            <Typography variant="body1" gutterBottom>
              Số lượng đánh giá: 1
            </Typography>
          </Stack>
        </Grid> */}
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        {/* <Button variant="outlined">Cập nhật thông tin cá nhân</Button> */}
        <EditInformationComponent informations={informations} />
        {/* <ConfirmDeleteAccountComponent informations={informations} /> */}
      </Stack></Paper>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSuccessSnackbar}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Cập nhật ảnh đại diện thành công!
        </Alert>
      </Snackbar>
    </>
  );
}
