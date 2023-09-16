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

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { editBrand, fetchBrands } from "../../../slices/brandSlice";
import { editSupplier, fetchSuppliers } from "../../../slices/supplierSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SupplierEditForm(props) {

  const existSupplier = props.data;

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

  const [supplierId, setSupplierID] = React.useState(existSupplier.id);
  const [supplierName, setSupplierName] = React.useState(existSupplier.name);
  const [supplierEmail, setSupplierEmail] = React.useState(existSupplier.email);
  const [supplierPhone, setSupplierPhone] = React.useState(existSupplier.phone);
  const [supplierAddress, setSupplierAddress] = React.useState(existSupplier.address);
  const [supplierStatus, setSupplierStatus] = React.useState(existSupplier.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateSupplierData = {
        supplierName: supplierName,
        supplierEmail: supplierEmail,
        supplierPhone: supplierPhone,
        supplierAddress: supplierAddress,
        supplierStatus: supplierStatus
    }
    dispatch(editSupplier({supplierId: supplierId, supplierData: updateSupplierData}))
      .then(() => {
        dispatch(fetchSuppliers());
        handleOpenSuccessSnackbar();
        console.log("Cập nhật nhà cung cấp thành công!");
      })
      .catch((error) => {
        console.log('Cập nhật nhà cung cấp thất bại: ' + error);
      })
    setOpen(false);
  };
   

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        startIcon={<UpdateIcon />}
        onClick={handleClickOpen}
      >
        Cập nhật
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Nhà Cung Cấp ID=${props.data.id}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            value={supplierName}
            onChange={e => {setSupplierName(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_email"
            label="Nhập email tả nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            value={supplierEmail}
            onChange={e => {setSupplierEmail(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_phone"
            label="Nhập số điện thoại nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            value={supplierPhone}
            onChange={e => {setSupplierPhone(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_address"
            label="Nhập địa chỉ nhà cung cấp"
            type="text"
            fullWidth
            variant="standard"
            value={supplierAddress}
            onChange={e => {setSupplierAddress(e.target.value)}}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={supplierStatus}
            onChange={e => {setSupplierStatus(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
            <FormControlLabel value="0" control={<Radio />} label="Không hoạt động" />
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
