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
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerInfo } from "../../../slices/customerSlice";
import EditInformationComponent from "../../../components/customer/personal/EditInformationComponent";
import ConfirmDeleteAccountComponent from "../../../components/customer/personal/ConfirmDeleteAccountComponent";
import { StyledBreadcrumb } from "../../../components/customize/CustomizeComponent";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";

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

export default function PersonalPage() {
    console.log("chech render PersonalPage");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomerInfo(localStorage.getItem("customerID")));
  }, [dispatch]);
  const informations = useSelector((state) => state.customer.customer);
  return (
    <>
    <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 3 }}>
        <StyledBreadcrumb
          label="Trang chủ"
          component="a"
          // href="#"
          onClick={() => {
            navigate("/");
          }}
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          label="Thông tin cá nhân"
          component="a"
          icon={<AccountCircleIcon fontSize="small" />}
        />
      </Breadcrumbs>
      <Grid container spacing={2} sx={{ padding: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Thông tin tài khoản
          </Typography>
          <Stack spacing={2}>
            <Avatar alt="Remy Sharp" src={`../../../public/avatar.png`} />

            <Typography variant="body1" gutterBottom>
              Họ tên: {informations.userName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {informations.userEmail}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Số điện thoại: {informations.userPhone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Giới tính: {informations.userSex == 1 ? "Nam" : informations.userSex == 2 ? "Nữ" : "Khác"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ngày sinh: {convertMillisecondsToDate(informations.userBirthday)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Vai trò: Thành viên
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ngày tham gia: {informations.userCreatedAt}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{marginBottom: 2}}
      >
        {/* <Button variant="outlined">Cập nhật thông tin cá nhân</Button> */}
        <EditInformationComponent informations={informations} />
        <ConfirmDeleteAccountComponent informations={informations} />
      </Stack>
    </>
  );
}
