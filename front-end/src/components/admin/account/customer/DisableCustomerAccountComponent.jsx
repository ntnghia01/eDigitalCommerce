import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import BlockIcon from '@mui/icons-material/Block';
import { useDispatch } from "react-redux";
import { disableCustomerAccount, fetchCustomerAccounts } from "../../../../slices/accountSlice";

import { Transition, Alert } from "../../../customize/CustomizeComponent";

export default function DisableCustomerAccountComponent(props) {
  const { account } = props;

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
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(disableCustomerAccount(account.userId))
      .then(() => {
        dispatch(fetchCustomerAccounts());
        setOpen(false);
        handleOpenSuccessSnackbar();
        console.log("Disable account successfully");
      })
      .catch((error) => {
        console.log("Disable account failed");
      });
  };

  return (
    <div>
      <Button startIcon={<BlockIcon />} onClick={handleClickOpen} color="error">
        Khóa
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Khóa tài khoản #${account.userId}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn khóa tài khoản này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
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
          Khóa tài khoản thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
