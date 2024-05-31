import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import MuiAlert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { editBrand, fetchBrands } from "../../../slices/brandSlice";
import { useCallback } from "react";
import { memo } from "react";
import { Transition } from "../../customize/CustomizeComponent";



const BrandEditForm = memo(({brand, onClose, handleOpenSuccessSnackbar}) => {
  console.log("BrandEditForm", brand.brandId);

  const existBrand = brand;

  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);



  const dispatch = useDispatch();

  const [brandId, setBrandID] = React.useState(existBrand.brandId);
  const [brandName, setBrandName] = React.useState(existBrand.brandName);
  const [brandDesc, setBrandDesc] = React.useState(existBrand.brandDesc);
  const [brandStatus, setBrandStatus] = React.useState(existBrand.brandStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateBrandData = {
      brandName: brandName,
      brandDesc: brandDesc,
      brandStatus: brandStatus
    }
    dispatch(editBrand({brandId: brandId, brandData: updateBrandData}))
      .then(() => {
        dispatch(fetchBrands());
        handleOpenSuccessSnackbar("Cập nhật thương hiệu thành công");
        console.log("Cập nhật thương hiệu thành công!");
        handleClose();
      })
      .catch((error) => {
        console.log('Cập nhật thương hiệu thất bại: ' + error);
      })
  };
   

  return (
    <div>
      {/* <Button
        variant="contained"
        color="warning"
        startIcon={<EditIcon />}
        onClick={handleClickOpen}
      >
        Cập nhật
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Thương Hiệu ID=${brand.brandId}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Tên thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={brandName}
            onChange={e => {setBrandName(e.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Mô tả thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={brandDesc}
            onChange={e => {setBrandDesc(e.target.value)}}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={brandStatus}
            onChange={e => {setBrandStatus(e.target.value)}}
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
export default BrandEditForm;
