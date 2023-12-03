import { Button, Grid, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { customerLogin, getCustomerInfo } from "../../../slices/customerSlice";
import { countCartDetail } from "../../../slices/cartSlice";
import { getOrderCountByCustomerId } from "../../../slices/orderSlice";

export default function CustomerLoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/signup');
  }

  const customer = useSelector((state) => state.customer.customer);
  // console.log(customer); //null

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const loginData = {
      username: username,
      password: password
    }
    console.log(loginData);
    dispatch(customerLogin(loginData))
      .then(() => {
        if (localStorage.getItem("customerID")) {
          navigate('/');
          dispatch(countCartDetail(localStorage.getItem("customerID")));
          dispatch(getOrderCountByCustomerId(localStorage.getItem("customerID")));
          dispatch(getCustomerInfo(localStorage.getItem("customerID")));
        } else {
          alert("Sai TK hoặc MK")
        }
        console.log("Đăng nhập thành công");
      })
  }

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <>
      <Grid container spacing={3} sx={{padding: 3}}>
      <Grid item xs={12} sm={6} >
      <Paper elevation={3} sx={{padding: 5}}>
      <h1 style={{textAlign: 'center'}}>Đăng nhập</h1>
        <Stack spacing={2}>
          <TextField
            // margin="dense"
            id="username"
            label="Tài khoản"
            type="text"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            // margin="dense"
            id="password"
            label="Mật khẩu"
            type="password"
            variant="outlined"
            onKeyUp={handleEnterKeyPress}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            color="primary"
            type="button"
            onClick={handleSubmit}
          >
            Đăng nhập
          </Button>
          <Button
            startIcon={<BorderColorIcon />}
            variant="contained"
            color="success"
            type="button"
            onClick={redirect}
          >
            Đăng ký
          </Button>
        </Stack>
      </Paper></Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Thay thế phần này bằng logo của bạn */}
        <img
          src="../../../public/logo2.png"
          alt="Logo"
          style={{ width: '67%', height: 'auto', borderRadius: 10 }}
        />
      </Grid>
    </Grid>
    </>
  );
}
