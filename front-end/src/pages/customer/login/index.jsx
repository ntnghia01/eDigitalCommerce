import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import Paper from "@mui/material/Paper";

export default function CustomerLoginPage() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const redirect = () => {
    navigate('/signup');
  }

  return (
    <>
      <Paper elevation={3}>
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
          >
            Đăng nhập
          </Button>
          <Button
            startIcon={<LoginIcon />}
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
