import * as React from "react";

import { Box, Grid, IconButton, Stack } from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addAddress,
  editAddress,
  fetchAddresses,
  getAddress,
} from "../../../slices/addressSlice";
import { useState } from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function EditAddressComponent(props) {
  const { editID } = props;
  const { handleSnackbar } = props;
  const { address } = props;
//   console.log(address);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  const [addressData, setAddressData] = useState({
    customerId: sessionStorage.getItem('customerID'),
    addressName: address.addressName,
    addressPhone: address.addressPhone,
    addressFull: address.addressFull,
    provinceId: address.provinceId,
    districtId: address.districtId,
    wardCode: address.wardCode,
    addressStatus: address.addressStatus,
  });

  const [addressActive, setAddressActive] = useState(editID);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
    // console.log(addressData);
  };
  const [isDefault, setIsDefault] = useState(address.addressStatus);

  const handleIsDefault = () => {
    if (isDefault == 1) {
      setIsDefault(2);
      setAddressData({
        ...addressData,
        ['addressStatus']: 2,
      });
    } else {
      setIsDefault(1);
      setAddressData({
        ...addressData,
        ['addressStatus']: 1,
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData);
    dispatch(editAddress({addressId: editID, addressData: addressData})).then(() => {
      handleSnackbar("Cập nhật địa chỉ thành công!");
      dispatch(fetchAddresses(sessionStorage.getItem("customerID")));
      console.log("Edit address successfully");
      handleClose();
    });
  };

  const [isChecked, setIsChecked] = useState(parseInt(address.addressStatus) === 2)

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <DriveFileRenameOutlineIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Chỉnh Sửa Địa Chỉ Giao Hàng"} #{editID}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="addressName"
            label="Tên người nhận"
            type="text"
            fullWidth
            variant="standard"
            name="addressName"
            defaultValue={address.addressName}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="addressPhone"
            label="Số điện thoại nhận thông báo"
            type="text"
            fullWidth
            variant="standard"
            name="addressPhone"
            defaultValue={address.addressPhone}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="addressFull"
            label="Địa chỉ giao hàng"
            type="text"
            fullWidth
            variant="standard"
            name="addressFull"
            defaultValue={address.addressFull}
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
          <FormGroup onMouseDown={() => handleIsDefault()}>
            <FormControlLabel
              control={
                <Checkbox name="addressStatus" defaultChecked={isChecked} />
              }
                label={`Địa chỉ mặc định`}
            //   label={addAddress.addressStatus}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
