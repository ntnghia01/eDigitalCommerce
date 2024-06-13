import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AddIcon from "@mui/icons-material/Add";
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Redux
import { useDispatch } from 'react-redux';
import { addBrand, fetchBrands } from '../../../slices/brandSlice';
import { addSupplier, fetchSuppliers } from '../../../slices/supplierSlice';
import { useState } from 'react';
import { Transition, Alert } from "../../../components/customize/CustomizeComponent";

export default function SupplierAddForm() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNull();
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const [supplierName, setSupplierName] = React.useState();
  const [supplierEmail, setSupplierEmail] = React.useState();
  const [supplierPhone, setSupplierPhone] = React.useState();
  const [supplierAddress, setSupplierAddress] = React.useState();
  const [isNull, setIsNull] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplierName) {
      setIsNull("SupplierName");
    } else if (!supplierEmail) {
      setIsNull("SupplierEmail");
    } else if (!supplierPhone) {
      setIsNull("SupplierPhone");
    } else if (!supplierAddress) {
      setIsNull("SupplierAddress");
    } else {
      const newSupplier = {
        supplierName: supplierName,
        supplierEmail: supplierEmail,
        supplierPhone: supplierPhone,
        supplierAddress: supplierAddress
      };
      // console.log(newSupplier);
      dispatch(addSupplier(newSupplier))
        .then(() => {
          dispatch(fetchSuppliers());
          handleOpenSnackbar();
          console.log('Thêm nhà cung cấp thành công!');
          handleClose();
        })
        .catch((error) => {
          console.log('Thêm thất bại: ' + error);
        })
    }
  }

  return (
    <div>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={handleClickOpen}>
        Thêm mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Nhà Cung Cấp Mới"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setSupplierName(e.target.value)}}
            required
            error={isNull == "SupplierName" ? true : false}
            helperText={isNull == "SupplierName" ? "Tên nhà cung cấp là bắt buộc" : ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_email"
            label="Nhập email nhà cung cấp"
            type="email"
            fullWidth
            variant="standard"
            onChange={e => {setSupplierEmail(e.target.value)}}
            required
            error={isNull == "SupplierEmail" ? true : false}
            helperText={isNull == "SupplierEmail" ? "Email nhà cung cấp là bắt buộc" : ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_phone"
            label="Nhập số điện thoại nhà cung cấp"
            type="number"
            fullWidth
            variant="standard"
            onChange={e => {setSupplierPhone(e.target.value)}}
            required
            error={isNull == "SupplierPhone" ? true : false}
            helperText={isNull == "SupplierPhone" ? "Số điện thoại nhà cung cấp là bắt buộc" : ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_address"
            label="Nhập địa chỉ nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setSupplierAddress(e.target.value)}}
            required
            error={isNull == "SupplierAddress" ? true : false}
            helperText={isNull == "SupplierAddress" ? "Địa chỉ nhà cung cấp là bắt buộc" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
          Thêm mới thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}