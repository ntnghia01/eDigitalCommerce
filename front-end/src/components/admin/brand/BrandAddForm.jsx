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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Redux
import { useDispatch } from 'react-redux';
import { addBrand, fetchBrands } from '../../../slices/brandSlice';
import { useState } from 'react';
import { Transition, Alert, VisuallyHiddenInput, getCurrentDateTime } from "../../../components/customize/CustomizeComponent";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebaseConfig'; // Path to firebaseConfig.js


export default function BrandAddForm() {

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

  const [brandName, setBrandName] = React.useState();
  const [brandDesc, setBrandDesc] = React.useState();
  const [isNull, setIsNull] = useState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!brandName) {
      setIsNull("BrandName")
    } else {
      try {
        var imageUrl = null;
        if (file != null) {
          imageUrl = await handleUploadImage();
        }
        const newBrand = {
          brandName: brandName,
          brandDesc: brandDesc,
          brandImage: imageUrl
        };
        dispatch(addBrand(newBrand))
          .then(() => {
            dispatch(fetchBrands());
            handleOpenSnackbar();
            setBrandName('');
            setBrandDesc('');
            console.log('Thêm thương hiệu thành công!');
          })
          .catch((error) => {
            console.log('Thêm thất bại: ' + error);
          })
        setOpen(false);
      } catch (error) {
        console.error('Thêm thương hiệu thất bại: ', error);
      }
    }
  }

  const handleUploadImage = () => {
    console.log("handleUpload");
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No file selected');
        return;
      }

      const storageRef = ref(storage, `images/brand_${getCurrentDateTime()}`);
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
        <DialogTitle>{"Thêm Thương Hiệu Mới"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setBrandName(e.target.value)}}
            required
            error={isNull == 'BrandName' ? true : false}
            helperText={isNull == 'BrandName' ? 'Tên thương hiệu là bắt buộc' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Nhập mô tả thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            onChange={e => {setBrandDesc(e.target.value)}}
          />
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
                onChange={e => setFile(e.target.files[0])}
              />
              </Button>
              {file && (<div><progress value={progress} max="100" /></div>)}
          
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