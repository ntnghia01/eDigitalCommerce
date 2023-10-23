import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import IconButton from "@mui/material/IconButton";
import { deleteBrand, fetchBrands } from '../../../slices/brandSlice';
import { deleteAddress, fetchAddresses } from '../../../slices/addressSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ConfirmDeleteAddress(props) {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

    const {handleSnackbar} = props;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAddress(props.deleteID))
      .then(() => {
        dispatch(fetchAddresses(sessionStorage.getItem('customerID')));
        setOpen(false);
        handleSnackbar("Xóa thành công!");
        console.log('Delete address successfully');
      })
      .catch((error) => {
        console.log("Delete address failed: " + error);
      });
  }

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <DeleteIcon />
        </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Địa Chỉ Giao Hàng"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa địa chỉ #{props.deleteID} này?
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}