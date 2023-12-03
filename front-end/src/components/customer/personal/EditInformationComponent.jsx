import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { editBrand, fetchBrands } from "../../../slices/brandSlice";
import { editSupplier, fetchSuppliers } from "../../../slices/supplierSlice";
import { getCustomerInfo, updateCustomerInfomation } from "../../../slices/customerSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function convertMillisecondsToDate(milliseconds) {
    const date = new Date(milliseconds);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = date.getFullYear();
  
    // Định dạng ngày và tháng để đảm bảo có hai chữ số
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    // Trả về chuỗi ngày/tháng/năm
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

export default function EditInformationComponent(props) {

  const {informations} = props;
  console.log(informations);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const handleOpenSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const dispatch = useDispatch();

  const [userId, setUserID] = React.useState(informations.userId);
  const [userPhone, setUserPhone] = React.useState(informations.userPhone);
  const [userName, setUserName] = React.useState(informations.userName);
  const [userSex, setUserSex] = React.useState(informations.userSex);
  const [userEmail, setUserEmail] = React.useState(informations.userEmail);
  const [userBirthday, setuserBirthday] = React.useState(informations.userBirthday);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateData = {
        userPhone: userPhone,
        userName: userName,
        userSex: userSex,
        userEmail: userEmail,
        userBirthday: convertMillisecondsToDate(userBirthday),
        userStatus: 1
    }
    console.log(updateData);
    dispatch(updateCustomerInfomation({userId: localStorage.getItem("customerID"), updateData: updateData}))
      .then(() => {
        dispatch(getCustomerInfo(localStorage.getItem("customerID")));
        handleOpenSuccessSnackbar();
        console.log("Cập nhật thông tin thành công!");
      })
      .catch((error) => {
        console.log('Cập nhật thông tin thất bại: ' + error);
      })
    setOpen(false);
  };
   

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        Cập nhật thông tin cá nhân
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Cập nhật thông tin cá nhân`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Họ tên"
            type="text"
            fullWidth
            variant="standard"
            value={userName}
            onChange={e => {setUserName(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_email"
            label="Số điện thoại"
            type="text"
            fullWidth
            variant="standard"
            value={userPhone}
            onChange={e => {setUserPhone(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_email"
            label="Email"
            type="text"
            fullWidth
            variant="standard"
            value={userEmail}
            onChange={e => {setUserEmail(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_email"
            label="Ngày sinh"
            type="date"
            fullWidth
            variant="standard"
            value={convertMillisecondsToDate(userBirthday)}
            onChange={e => {setuserBirthday(e.target.value)}}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={userSex}
            onChange={e => {setUserSex(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Nam" />
            <FormControlLabel value="2" control={<Radio />} label="Nữ" />
            <FormControlLabel value="0" control={<Radio />} label="Khác" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
