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
import { useDispatch } from 'react-redux';
import { deleteBrand, fetchBrands } from '../../../slices/brandSlice';
import { Transition } from '../../customize/CustomizeComponent';
import { memo } from 'react';


const ConfirmDeleteBrand = memo(({brand, onClose, handleOpenSuccessSnackbar}) => {
  console.log("ComfirmDeleteBrand", brand.brandId);

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
    dispatch(deleteBrand(brand.brandId))
      .then(() => {
        dispatch(fetchBrands());
        setOpen(false);
        handleOpenSuccessSnackbar("Xóa thương hiệu thành công");
        console.log('Delete brand successfully');
        handleClose();
      })
      .catch((error) => {
        console.log("Delete brand failed");
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
        <DialogTitle>{"Xóa Thương Hiệu"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có chắc muốn xóa thương hiệu ID={brand.brandId} này?
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

export default ConfirmDeleteBrand;