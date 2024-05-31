import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { deleteProduct, fetchProducts } from '../../../slices/productSlice';
import { Transition } from '../../customize/CustomizeComponent';
import { memo } from 'react';




const ConfirmDeleteProduct = memo(({product, onClose, handleOpenSuccessSnackbar}) => {
  console.log("ConfirmDeleteProduct", product.proId);
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
    dispatch(deleteProduct(product.proId))
      .then(() => {
        dispatch(fetchProducts());
        setOpen(false);
        handleOpenSuccessSnackbar("Xóa sản phẩm thành công");
        handleClose();
        console.log('Delete product successfully');
      })
      .catch((error) => {
        console.log("Delete product failed");
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
        <DialogTitle>{`Xóa Sản Phẩm #${product.proId}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa sản phẩm này?
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

export default ConfirmDeleteProduct;