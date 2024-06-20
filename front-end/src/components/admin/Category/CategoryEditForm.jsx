
import React, { useCallback, useState } from 'react';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";

import { useDispatch } from "react-redux";
import { fetchCategories, updateCategory } from "../../../slices/categorySlice";
import { Transition, getCurrentDateTime, VisuallyHiddenInput } from "../../../components/customize/CustomizeComponent";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../../../firebaseConfig'; // Path to firebaseConfig.js
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


const CategoryEditForm = React.memo(({ category, onClose, handleOpenSuccessSnackbar }) => {
  console.log("CategoryEditForm", category.cateId);
  const existCategory = category;
  // console.log(category);

  const [open, setOpen] = React.useState(true);

  const handleClose = useCallback(() => {
    setOpen(false);
    onClose();
  }, [onClose]);



  const dispatch = useDispatch();

  const [cateId, setCateID] = useState(existCategory.cateId);
  const [cateName, setCateName] = useState(existCategory.cateName);
  const [cateDesc, setCateDesc] = useState(existCategory.cateDesc);
  const [cateStatus, setCateStatus] = useState(existCategory.cateStatus);
  const [cateImage, setCateImage] = useState(existCategory.cateImage)
  const [isNull, setIsNull] = useState();
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cateName) {
      setIsNull("CateName")
    } else {
      var imageUrl = null;
      if (file != null) {
        console.log(file);
        imageUrl = await handleUploadImage();
        setCateImage(imageUrl);
      } else {
        imageUrl = cateImage
      }
      const updateCategoryData = {
        categoryName: cateName,
        categoryDesc: cateDesc,
        categoryImage: imageUrl,
        categoryStatus: cateStatus,
      };
      // console.log(updateCategory);
      dispatch(updateCategory({categoryId: cateId, categoryData: updateCategoryData}))
        .then(() => {
          dispatch(fetchCategories());
          handleOpenSuccessSnackbar("Cập nhật danh mục thành công");
          console.log('Category updated successfully');
          handleClose();
        })
        .catch((error) => {
            console.log('Sủa danh mục thất bại: '+error);
        });
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Danh Mục #${existCategory.cateId}`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={cateName}
            onChange={e => {setCateName(e.target.value)}}
            required
            error={isNull == "CateName" ? true : false}
            helperText={isNull == "CateName" ? 'Tên danh mục là bắt buộc' : ''}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={cateDesc}
            onChange={e => {setCateDesc(e.target.value)}}
          />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={cateStatus}
            onChange={e => {setCateStatus(e.target.value)}}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
            <FormControlLabel value="0" control={<Radio />} label="Không hoạt động" />
          </RadioGroup>
          {cateImage && (
            <img src={cateImage} alt="" style={{width: "50%", height: "50%"}} />
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
          
          {/* <button onClick={handleUpload}>Upload</button> */}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default CategoryEditForm;
