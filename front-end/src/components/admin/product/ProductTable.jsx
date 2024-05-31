import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import CollectionsIcon from '@mui/icons-material/Collections';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "../../customize/CustomizeComponent";
import DeleteIcon from '@mui/icons-material/Delete';

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";




import { fetchProducts, searchProductByName } from "../../../slices/productSlice";
import ProductEditForm from "./ProductEditForm";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";
import ProductImageComponent from "./ProductImageComponent";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { formatDateTime, formatNumberWithCommas } from "../../customize/CustomizeComponent";


const uploadDirectory = "D:/Projects/eDigitalCommerce/backend-springboot/src/main/java/com/backend/springboot/ecommerce/uploads/";

const ProductTable = React.memo(() => {
  console.log("ProductTable");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductEdit, setSelectedProductEdit] = useState(null);
  const [selectedProductDelete, setSelectedProductDelete] = useState(null);

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  const handleImageClick = useCallback((product) => {
    console.log("setSelectedProduct: ", product.proId);
    setSelectedProduct(product);
  }, []);

  const handleProductEditClick = useCallback((product) => {
    console.log("setSelectedProductEdit: ", product.proId);
    setSelectedProductEdit(product);
  }, []);

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [snackbarSuccessContent, setSnackbarSuccessContent] = useState("Cập nhật thành công");
  const handleOpenSuccessSnackbar = (content) => {
    setOpenSuccessSnackbar(true);
    setSnackbarSuccessContent(content);
  };
  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                  <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="left">Tên</TableCell>
                      <TableCell align="left">Hình ảnh</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="left">Mô tả</TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="left">Danh mục</TableCell>
                      <TableCell align="left">Thương hiệu</TableCell>
                      <TableCell align="center">Trạng thái</TableCell>
                      <TableCell align="right">Ngày Tạo&nbsp;(dd-mm-yyyy hh-mm-ss)</TableCell>
                      <TableCell align="right">Ngày Cập Nhật&nbsp;(dd-mm-yyyy hh-mm-ss)</TableCell>
                      <TableCell align="center">Thao Tác</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {products.map((product) => (
                      <TableRow key={product.proId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                          <TableCell component="th" scope="row">#{product.proId}</TableCell>
                          <TableCell align="left">{product.proName}</TableCell>
                          <TableCell align="left">
                              <Stack direction="row">
                                  <img src={`http://localhost:9004/api/product/images/${product.proImage}`} alt="" style={{width: "100px", height: "100px"}} />
                                  <IconButton onClick={() => handleImageClick(product)}>
                                      <CollectionsIcon />
                                  </IconButton>
                              </Stack>
                          </TableCell>
                          <TableCell align="right">{formatNumberWithCommas(product.proPrice)}</TableCell>
                          <TableCell align="left">{product.proDesc.slice(0, 100)}</TableCell>
                          <TableCell align="right">{product.proQuantity}</TableCell>
                          <TableCell align="left">{product.category.cateName}</TableCell>
                          <TableCell align="left">{product.brand.brandName}</TableCell>
                          <TableCell align="left">
                              {product.proStatus == 1 ? 
                                  <Typography sx={{backgroundColor:'#4caf50', color:'white', textAlign: 'center', borderRadius: '5rem', width: "10vh"}}>Hoạt động</Typography>
                              : product.proStatus == 0 ?
                                  <Typography sx={{backgroundColor:'orange', color:'white', textAlign: 'center', borderRadius: '5rem'}}>Vô hiệu hóa</Typography>
                              :   <Typography sx={{backgroundColor:'#ff3d00', color:'white', textAlign: 'center', borderRadius: '5rem'}}>Đã xóa</Typography>
                              }
                          </TableCell>
                          <TableCell align="right">{formatDateTime(product.proCreatedAt)}</TableCell>
                          <TableCell align="right">{formatDateTime(product.proUpdatedAt)}</TableCell>
                          <TableCell align="left">
                              <Stack direction="row" spacing={2}>
                                  {/* <ProductEditForm data={{id: product.proId, name: product.proName, price: product.proPrice, desc: product.proDesc, quantity: product.proQuantity, category: product.category.cateId, brand: product.brand.brandId, status: product.proStatus, image: product.proImage}} />
                                  <Button variant="contained" color="warning" onClick={() => handleEditClick(product)}>
                                        Cập nhật
                                    </Button> */}
                                  <Button
                                    variant="contained"
                                    color="warning"
                                    startIcon={<EditIcon />}
                                    onClick={() => handleProductEditClick(product)}
                                    style={{width: '8rem'}}
                                  >
                                    Cập nhật
                                  </Button>
                                  <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => setSelectedProductDelete(product)}>
                                    Xóa
                                </Button>
                              </Stack>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
          {selectedProduct && (
              <ProductImageComponent 
                  product={selectedProduct} 
                  onClose={() => setSelectedProduct(null)} 
              />
          )}
          {selectedProductEdit && (
              <ProductEditForm 
                  product={selectedProductEdit} 
                  onClose={() => setSelectedProductEdit(null)} 
              />
          )}
          {selectedProductDelete && (
              <ConfirmDeleteProduct 
                  product={selectedProductDelete} 
                  onClose={() => setSelectedProductDelete(null)}
                handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}
              />
          )}
      </TableContainer>
      <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
          <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
            {snackbarSuccessContent}
          </Alert>
        </Snackbar>
      </>
  );
});

export default ProductTable;