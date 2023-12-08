import {
    Button,
    Dialog,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    TextField,
  } from "@mui/material";
  import BorderColorIcon from '@mui/icons-material/BorderColor';
  import { useState } from "react";
  
import { customerSignup } from "../../../../slices/customerSlice";
  import LoginIcon from "@mui/icons-material/Login";
  import Paper from "@mui/material/Paper";
  import { useDispatch } from "react-redux";
  import { useNavigate } from 'react-router-dom';
  import BlockIcon from '@mui/icons-material/Block';
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
  import DialogContentText from "@mui/material/DialogContentText";
  import DialogTitle from "@mui/material/DialogTitle";
  import Slide from "@mui/material/Slide";
  import MuiAlert from "@mui/material/Alert";
  import AddIcon from "@mui/icons-material/Add";

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  export default function AddAdminAccount() {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
    const handleOpenSuccessSnackbar = () => {
      setOpenSuccessSnackbar(true);
    };
    const handleCloseSuccessSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSuccessSnackbar(false);
    };
  
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [signupData, setSignupData] = useState({
      userPhone: "",
      userPassword: "",
      userName: "",
      userSex: 3,
      userEmail: "",
      userBirthday: "",
      userRole: 2
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
      if (signupData.userPassword !== confirmPassword) {
        // Nếu mật khẩu và mật khẩu nhập lại không khớp
        alert("Mật khẩu không khớp");
        // Thực hiện các hành động thông báo hoặc xử lý khác ở đây (ví dụ: hiển thị thông báo)
      } else {
        dispatch(customerSignup(signupData))
            .then(() => {
                console.log("Đăng ký thành công");
                // navigate('/login')
                handleClose()
            })
      }
    }
  
    const redirect = () => {
      navigate('/login');
    }
  
    return (
      <>
        <Button startIcon={<AddIcon />} onClick={handleClickOpen} variant="contained">
        Tạo tài khoản quản trị
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Tạo tài khoản`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Stack spacing={2}>
            <TextField
              // margin="dense"
              name="userPhone"
              id="user_phone"
              label="Tài khoản"
              type="text"
              variant="outlined"
              onChange={(e) => {
                  handleInputChange(e);
              }}
            />
            <TextField
              // margin="dense"
              name="userPassword"
              id="user_password"
              label="Mật khẩu"
              type="password"
              variant="outlined"
              onChange={(e) => {
                  handleInputChange(e);
              }}
            />
            <TextField
              name="confirmPassword"
              id="confirm_password"
              label="Nhập lại mật khẩu"
              type="password"
              variant="outlined"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <TextField
              // margin="dense"
              name="userName"
              id="user_name"
              label="Tên"
              type="text"
              variant="outlined"
              onChange={(e) => {
                  handleInputChange(e);
              }}
            />
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="userSex"
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
              name="userEmail"
              id="user_email"
              label="Email"
              type="email"
              variant="outlined"
              onChange={(e) => {
                  handleInputChange(e);
              }}
            />
            <TextField
              name="userBirthday"
              id="user_birthday"
              label="Ngày sinh"
              type="date"
              variant="outlined"
              focused
              onChange={(e) => {
                  handleInputChange(e);
              }}
            />
          </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Tạo</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog> 
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
          Tạo tài khoản thành công!
        </Alert>
      </Snackbar>


      </>
    );
  }
  