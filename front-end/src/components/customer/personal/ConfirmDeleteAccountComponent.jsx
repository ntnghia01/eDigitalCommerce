import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { deleteBrand, fetchBrands } from "../../../slices/brandSlice";
import { deleteAddress, fetchAddresses } from "../../../slices/addressSlice";
import { deleteCustomerAccount } from "../../../slices/customerSlice";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmDeleteAccountComponent(props) {
  console.log("Check render ConfirmDeleteAccountComponent");

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

  const { informations } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteCustomerAccount(informations.userId))
      .then(() => {
        // dispatch(fetchAddresses(localStorage.getItem("customerID")));
        setOpen(false);
        console.log("Delete account successfully");
        
        localStorage.removeItem("customerID");
        localStorage.removeItem("customerName");
        localStorage.removeItem("customerToken");
        navigate('/');
        handleOpenSuccessSnackbar();
      })
      .catch((error) => {
        console.log("Delete address failed: " + error);
      });
  };

  return (
    <>
      <Button startIcon={<PersonRemoveIcon />} variant="outlined" onClick={handleClickOpen}>
        Xóa tài khoản
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Tài Khoản"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa tài khoản này #{informations.userId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Đã xóa tài khoản!
        </Alert>
      </Snackbar>
    </>
  );
}
