import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import KeyIcon from '@mui/icons-material/Key';
import { useDispatch } from "react-redux";
import { activeCustomerAccount, fetchCustomerAccounts } from "../../../../slices/accountSlice";

import { Transition, Alert } from "../../../customize/CustomizeComponent";

export default function ActiveShipperAccountComponent(props) {
    console.log("check ActiveShipperAccountComponent");
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
    dispatch(activeCustomerAccount(account.userId))
      .then(() => {
        dispatch(fetchCustomerAccounts());
        setOpen(false);
        handleOpenSuccessSnackbar();
        console.log("Active account successfully");
      })
      .catch((error) => {
        console.log("Active account failed");
      });
  };

  return (
    <div>
      <Button startIcon={<KeyIcon />} onClick={handleClickOpen}>
        Mở
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Kích hoạt tài khoản #${account.userId} `}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn kích hoạt lại tài khoản này?
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
          Kích hoạt tài khoản thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
