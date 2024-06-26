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
import { useState } from "react";
import { Transition, getCurrentDateTime, VisuallyHiddenInput } from "../../../components/customize/CustomizeComponent";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebaseConfig'; // Path to firebaseConfig.js
import CloudUploadIcon from "@mui/icons-material/CloudUpload";



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
  const [isNull, setIsNull] = useState();
  const [brandImage, setBrandImage] = useState(existBrand.brandImage);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName) {
      setIsNull("BrandName")
    } else {
      var imageUrl = null;
      if (file != null) {
        // console.log(file);
        imageUrl = await handleUploadImage();
        setBrandImage(imageUrl);
      } else {
        imageUrl = brandImage
      }
      const updateBrandData = {
        brandName: brandName,
        brandDesc: brandDesc,
        brandStatus: brandStatus,
        brandImage: imageUrl
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
    }
  };

  const handleUploadImage = () => {
    console.log("handleUpload");
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file selected');
        return;
      }

      const storageRef = ref(storage, `images/category_${getCurrentDateTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        error => {
          console.error("Upload failed:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            console.log("File available at:", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
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
            required
            error={isNull == 'BrandName' ? true : false}
            helperText={isNull == 'BrandName' ? 'Tên thương hiệu là bắt buộc' : ''}
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
          {brandImage && (
            <img src={brandImage} alt="" style={{width: "50%", height: "50%"}} />
          )}
          <div>
            {/* <input type="file" onChange={e => setFile(e.target.files[0])} /> */}
            <Button
              component="label"
              variant="contained"
              style={{ marginTop: 20 }}
              startIcon={<CloudUploadIcon />}
            >
              Tải lên hình ảnh
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={e => {
                  setFile(e.target.files[0]);
                }}
              />
            </Button>
            {file && (<span>{file.name}</span>)}
            </div>
            <progress value={progress} max="100" />
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
