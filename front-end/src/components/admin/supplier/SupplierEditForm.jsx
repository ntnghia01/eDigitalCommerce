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
import { Transition } from "../../customize/CustomizeComponent";
import { memo } from "react";
import { useState } from "react";


const SupplierEditForm = memo(({supplier, onClose, handleOpenSuccessSnackbar}) => {

  const [open, setOpen] = React.useState(true);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    onClose();
  };


  const dispatch = useDispatch();

  const [supplierId, setSupplierID] = React.useState(supplier.supplierId);
  const [supplierName, setSupplierName] = React.useState(supplier.supplierName);
  const [supplierEmail, setSupplierEmail] = React.useState(supplier.supplierEmail);
  const [supplierPhone, setSupplierPhone] = React.useState(supplier.supplierPhone);
  const [supplierAddress, setSupplierAddress] = React.useState(supplier.supplierAddress);
  const [supplierStatus, setSupplierStatus] = React.useState(supplier.supplierStatus);
  const [isNull, setIsNull] = useState();

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
          handleOpenSuccessSnackbar("Cập nhật nhà cung cấp thành công");
          console.log("Cập nhật nhà cung cấp thành công!");
          onClose();
        })
        .catch((error) => {
          console.log('Cập nhật nhà cung cấp thất bại: ' + error);
        })
      setOpen(false);
      }
  };
   

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Nhà Cung Cấp ID=${supplier.supplierId}`}</DialogTitle>
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
            required
            error={isNull == "SupplierName" ? true : false}
            helperText={isNull == "SupplierName" ? "Tên nhà cung cấp là bắt buộc" : ""}
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
            required
            error={isNull == "SupplierEmail" ? true : false}
            helperText={isNull == "SupplierEmail" ? "Email nhà cung cấp là bắt buộc" : ""}
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
            value={supplierAddress}
            onChange={e => {setSupplierAddress(e.target.value)}}
            required
            error={isNull == "SupplierAddress" ? true : false}
            helperText={isNull == "SupplierAddress" ? "Địa chỉ nhà cung cấp là bắt buộc" : ""}
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
    </div>
  );
})

export default SupplierEditForm;
