import * as React from "react";

import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Stack } from "@mui/material";
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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addAddress, fetchAddressDistrictByProvinceID, fetchAddressProvince, fetchAddressWardByDistrictID, fetchAddresses } from "../../../slices/addressSlice";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddAddressComponent(props) {
  // console.log("check render AddAddressComponent");

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addressData, setAddressData] = useState({
    customer: sessionStorage.getItem('customerID'),
    addressName: "",
    addressPhone: "",
    addressFull: "",
    addressStatus: 1,
    provinceId: 0,
    districtId: 0,
    wardCode: ""
  });

  const {handleSnackbar} = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const {handleSetAddressActive} = props;

  useEffect(() => {
    dispatch(fetchAddressProvince());
  },[dispatch])

  const provinces = useSelector((state) => state.address.addressProvince);
  const [addressProvince, setAddressProvince] = useState();
  const [addressDistrict, setAddressDistrict] = useState();
  const [addressWard, setAddressWard] = useState();
  const [addressStreetNumber, setAddressStreetNumber] = useState();
  const [addressFull, setAddressFull] = useState();

  const handleSetAddressProvince = (e) => {
    setAddressProvince(e);
    // setAddressProvince(e);
    dispatch(fetchAddressDistrictByProvinceID(e));
  }

  const handleSetAddressDistrict = (e) => {
    setAddressDistrict(e);
    dispatch(fetchAddressWardByDistrictID(e));
  }

  // Func to update addressFull when changed values
  const updateAddressFull = () => {
    if (
      provinces.length > 0 && 
      districts.length > 0 && 
      wards.length > 0 && 
      addressProvince && 
      addressDistrict && 
      addressWard && 
      addressStreetNumber
    ) {
      const addressProvinceName = provinces.find(province => province.ProvinceID === addressProvince);
      const addressDistrictName = districts.find(district => district.DistrictID === addressDistrict);
      const addressWardName = wards.find(ward => ward.WardCode === addressWard);
      if (addressProvinceName && addressDistrictName && addressWardName) {
        const fullAddress = `${addressStreetNumber}, ${addressWardName.WardName}, ${addressDistrictName.DistrictName}, ${addressProvinceName.ProvinceName}`;
        setAddressData({
          ...addressData,
          addressFull: fullAddress,
          provinceId: addressProvince,
          districtId: addressDistrict,
          wardCode: addressWard
        });
      }
    }
  };
  

  const districts = useSelector((state) => state.address.addressDistrict);
  const wards = useSelector((state) => state.address.addressWard);
  // Sử dụng useEffect để gọi hàm cập nhật addressFull khi các giá trị thay đổi
  useEffect(() => {
    updateAddressFull();
  }, [provinces, districts, wards, addressStreetNumber, addressWard, addressDistrict, addressProvince]);



  // console.log(addressProvince);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData);
    dispatch(addAddress(addressData))
      .then(() => {
        handleSnackbar("Thêm địa chỉ thành công!");
        dispatch(fetchAddresses(sessionStorage.getItem('customerID')));
        console.log("Add address successfully");
        handleClose();
        handleSetAddressActive();
        dispatch(fetchAddresses(sessionStorage.getItem('customerID')));
      })
  }
  const [isDefault, setIsDefault] = useState(1);

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
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Grid item xs={6}>
        <Box
          sx={{
            p: 2,
            border: "1px solid grey",
            borderRadius: 5,
            height: "100%",
          }}
          onClick={() => handleClickOpen()}
        >
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            // sx={{height: '190'}}
          >
            <IconButton aria-label="edit">
              <AddToPhotosIcon />
            </IconButton>
            <div>Thêm địa chỉ</div>
          </Stack>
        </Box>
        
      </Grid>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Địa Chỉ Giao Hàng"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="addressName"
            label="Nhập tên người nhận"
            type="text"
            fullWidth
            variant="standard"
            name="addressName"
            onChange={e => {handleInputChange(e)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="addressPhone"
            label="Nhập số điện thoại nhận thông báo"
            type="text"
            fullWidth
            variant="standard"
            name="addressPhone"
            onChange={e => {handleInputChange(e)}}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="addressFull"
            label="Nhập địa chỉ giao hàng"
            type="text"
            fullWidth
            variant="standard"
            name="addressFull"
            onChange={e => {handleInputChange(e)}}
          /> */}
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Province"
              onChange={(e) => {
                handleSetAddressProvince(e.target.value);
              }}
            >
              {provinces.map((province) => (
                    <MenuItem key={province.ProvinceID} value={province.ProvinceID} 
                    // onClick={()=>{handleSetProvinceName(province.ProvinceName)}}
                    >{province.ProvinceName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Quận / Huyện</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="District"
              onChange={(e) => {
                handleSetAddressDistrict(e.target.value);
              }}
            >
              {districts.map((district) => (
                    <MenuItem key={district.DistrictID} value={district.DistrictID}>{district.DistrictName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{mt: 3}}>
            <InputLabel id="demo-simple-select-label">Xã / Phường</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Ward"
              onChange={(e) => {
                setAddressWard(e.target.value);
              }}
            >
              {wards.map((ward) => (
                    <MenuItem key={ward.WardCode} value={ward.WardCode}>{ward.WardName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="addressStreetNumber"
            label="Địa chỉ cụ thể"
            type="text"
            fullWidth
            variant="standard"
            name="addressStreetNumber"
            onChange={e => {setAddressStreetNumber(e.target.value)}}
          />
          <FormGroup onMouseDown={() => handleIsDefault()}>
            <FormControlLabel
              control={
                <Checkbox name="addressStatus" defaultChecked={isChecked} />
              }
                label={`Địa chỉ mặc định`}
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
