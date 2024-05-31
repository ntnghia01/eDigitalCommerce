import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteSupplier, fetchSuppliers } from '../../../slices/supplierSlice';
import { Transition } from '../../customize/CustomizeComponent';
import { memo } from 'react';


const ConfirmDeleteSupplier = memo(({supplier, onClose, handleOpenSuccessSnackbar}) => {

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteSupplier(supplier.supplierId))
      .then(() => {
        dispatch(fetchSuppliers());
        handleOpenSuccessSnackbar("Xóa nhà cung cấp thành công");
        console.log('Delete supplier successfully');
        handleClose();
      })
      .catch((error) => {
        console.log("Delete supplier failed");
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Xóa Nhà Cung Cấp"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa nhà cung cấp #{supplier.supplierId} này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default ConfirmDeleteSupplier;