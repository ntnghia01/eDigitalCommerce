import * as React from 'react';
import { useState } from "react"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { TextField } from '@mui/material';

import { addCategory, fetchCategories } from '../../../slices/categorySlice';
import { useDispatch } from 'react-redux';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebaseConfig'; // Path to firebaseConfig.js
import { Transition, Alert, getCurrentDateTime } from "../../../components/customize/CustomizeComponent";



export default function CategoryAddForm() {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNull('');
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
  
  
  const [cateName, setCateName] = useState('');
  const [cateDesc, setCateDesc] = useState('');
  const [isNull, setIsNull] = useState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cateName) {
      setIsNull("CateName")
    } else {
      try {
        var imageUrl = null;
        if (file != null) {
          imageUrl = await handleUploadImage();
        }
        const newCategory = {
          categoryName: cateName,
          categoryDesc: cateDesc,
          categoryImage: imageUrl
        };
        dispatch(addCategory(newCategory))
          .then(() => {
            dispatch(fetchCategories());
            handleOpenSnackbar();
            setCateName('');
            setCateDesc('');
            console.log('Thêm danh mục mới thành công');
          })
          .catch((error) => {
              console.log('Thêm danh mục thất bại: '+ error);
          });
        setOpen(false);
      } catch (error) {
        console.error('Thêm danh mục thất bại:', error);
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
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Thêm mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Mới Danh Mục"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            value={cateName}
            onChange={e => {setCateName(e.target.value)}}
            required
            error={isNull == "CateName" ? true : false}
            helperText={isNull == "CateName" ? 'Tên danh mục là bắt buộc' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Nhập mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
            value={cateDesc}
            onChange={e => {setCateDesc(e.target.value)}}
          />
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          {/* <button onClick={handleUpload}>Upload</button> */}
          {file && (<progress value={progress} max="100" />)}
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