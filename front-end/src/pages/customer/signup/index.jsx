import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useState } from "react";

import LoginIcon from "@mui/icons-material/Login";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { customerSignup } from "../../../slices/customerSlice";
import { useNavigate } from 'react-router-dom';

export default function CustomerSignupPage() {

  const [signupData, setSignupData] = useState({
    customerPhone: "",
    customerPassword: "",
    customerName: "",
    customerSex: 3,
    customerEmail: "",
    customerBirthday: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.name);
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    // console.log(signupData);
    e.preventDefault();
    dispatch(customerSignup(signupData))
        .then(() => {
            console.log("Đăng ký thành công");
            navigate('/login')
        })
  }

  const redirect = () => {
    navigate('/login');
  }

  return (
    <>
      <Paper elevation={3} sx={{padding: 5}}>
        <h1>Đăng ký</h1>
        <Stack spacing={2}>
          <TextField
            // margin="dense"
            name="customerPhone"
            id="customer_phone"
            label="Số điện thoại"
            type="text"
            variant="outlined"
            onChange={(e) => {
                handleInputChange(e);
            }}
          />
          <TextField
            // margin="dense"
            name="customerPassword"
            id="customer_password"
            label="Mật khẩu"
            type="password"
            variant="outlined"
            onChange={(e) => {
                handleInputChange(e);
            }}
          />
          <TextField
            // margin="dense"
            name="customerName"
            id="customer_name"
            label="Họ tên"
            type="text"
            variant="outlined"
            onChange={(e) => {
                handleInputChange(e);
            }}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="customerSex"
            // value={supplierStatus}
            onChange={(e) => {
                handleInputChange(e);
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="Nam" />
            <FormControlLabel value="2" control={<Radio />} label="Nữ" />
            <FormControlLabel value="3" control={<Radio />} label="Khác" />
          </RadioGroup>
          <TextField
            name="customerEmail"
            id="customer_email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => {
                handleInputChange(e);
            }}
          />
          <TextField
            name="customerBirthday"
            id="customer_birthday"
            label="Ngày sinh"
            type="date"
            variant="outlined"
            focused
            onChange={(e) => {
                handleInputChange(e);
            }}
          />
          <Button
            startIcon={<BorderColorIcon />}
            variant="contained"
            color="success"
            type="button"
            onClick={handleSubmit}
          >
            Đăng ký
          </Button>
          <Button
            startIcon={<LoginIcon />}
            variant="contained"
            color="primary"
            type="button"
            onClick={redirect}
          >
            Đăng nhập
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
