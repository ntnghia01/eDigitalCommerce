import { Box, IconButton } from "@mui/material";
import CollectionsIcon from '@mui/icons-material/Collections';
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { addImage, deleteImage, fetchImageByProductID } from "../../../slices/imageSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import InfoIcon from "@mui/icons-material/Info";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Transition } from "../../customize/CustomizeComponent";
import { useEffect } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { VisuallyHiddenInput } from "../../customize/CustomizeComponent";

const ProductImageComponent = React.memo(({ product, onClose }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const images = useSelector((state) => state.image.images);

  useEffect(() => {
      dispatch(fetchImageByProductID(product.proId));
  }, [dispatch, product.proId]);

  const handleClose = useCallback(() => {
      setOpen(false);
      onClose();
  }, [onClose]);

  const handleAddImage = useCallback((e) => {
      const imageData = {
          proId: product.proId,
          image: e.target.files[0]
      };
      dispatch(addImage(imageData)).then(() => {
          dispatch(fetchImageByProductID(product.proId));
      });
  }, [dispatch, product.proId]);

  const handleDeleteImage = useCallback((imageId) => {
      dispatch(deleteImage(imageId)).then(() => {
          dispatch(fetchImageByProductID(product.proId));
      });
  }, [dispatch, product.proId]);

  return (
      <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle>{`Các hình ảnh liên quan sản phẩm #${product.proId}`}</DialogTitle>
          <Box sx={{padding: 3}}>
              <Button
                  component="label"
                  variant="contained"
                  style={{ marginTop: 20 }}
                  startIcon={<CloudUploadIcon />}
              >
                  Thêm hình ảnh
                  <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleAddImage}
                      style={{ display: 'none' }}
                  />
              </Button>
          </Box>
          <DialogContent>
              <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                      <TableHead>
                          <TableRow>
                              <TableCell>ID</TableCell>
                              <TableCell align="center">Hình ảnh</TableCell>
                              <TableCell align="center">Thao tác</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {images.map((image) => (
                              <TableRow key={image.imageId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                  <TableCell component="th" scope="row">
                                      #{image.imageId}
                                  </TableCell>
                                  <TableCell align="center">
                                      <img src={`http://localhost:9004/api/product/images/${image.image}`} alt="" style={{width: "40%"}} />
                                  </TableCell>
                                  <TableCell align="center">
                                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeleteImage(image.imageId)}>Xóa</Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
          </DialogContent>
          <DialogActions>
              <Button onClick={handleClose}>Đóng</Button>
          </DialogActions>
      </Dialog>
  );
});

export default ProductImageComponent;