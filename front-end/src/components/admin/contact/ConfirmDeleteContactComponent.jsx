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
import { deleteBrand, fetchBrands } from '../../../slices/brandSlice';
import { deleteSupplier, fetchSuppliers } from '../../../slices/supplierSlice';
import { deleteProduct, fetchProducts } from '../../../slices/productSlice';
import { deleteContact, fetchContacts } from '../../../slices/contactSlice';
import { Transition, Alert } from "../../../components/customize/CustomizeComponent";

export default function ConfirmDeleteContactComponent(props) {

    const {contact} = props;

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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteContact(contact.contactId))
      .then(() => {
        dispatch(fetchContacts());
        setOpen(false);
        handleOpenSuccessSnackbar();
        console.log('Delete contact successfully');
      })
      .catch((error) => {
        console.log("Delete contact failed");
      });
  }

  return (
    <div>
      <Button variant="contained" color='error' startIcon={<DeleteIcon />} onClick={handleClickOpen}>
        Xóa
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa liên hệ"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa liên hệ này #{contact.contactId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Xóa thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}