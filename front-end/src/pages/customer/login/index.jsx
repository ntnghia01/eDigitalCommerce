import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { customerLogin } from "../../../slices/customerSlice";

export default function CustomerLoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/signup');
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const loginData = {
      username: username,
      password: password
    }
    console.log(loginData);
    dispatch(customerLogin(loginData))
      .then(() => {
        if (sessionStorage.getItem("customerID")) {
          navigate('/');
        } else {
          alert("Sai TK hoặc MK")
        }
        console.log("Đăng nhập thành công");
      })
  }

  return (
    <>
      <Paper elevation={3} sx={{padding: 5}}>
        <h1>Đăng nhập</h1>
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
      </Paper>
    </>
  );
}
