import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";



import { fetchProducts } from "../../../slices/productSlice";
import ProductEditForm from "./ProductEditForm";
import ConfirmDeleteProduct from "./ConfirmDeleteProduct";

const formatDateTime = (oriDateTime) => {
    const dateTime = new Date(oriDateTime);
    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    const newDateTime = `${date < 10 ? '0' : ''}${date}-${month < 10 ? '0' : ''}${month}-${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
    return newDateTime;
}

const uploadDirectory = "D:/Projects/eDigitalCommerce/backend-springboot/src/main/java/com/backend/springboot/ecommerce/uploads/";

export default function ProductTable() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    // console.log(products);
    return (
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
                <TableCell align="right">
                  Ngày Tạo&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell>
                <TableCell align="right">
                  Ngày Cập Nhật&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.proId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{product.proId}</TableCell>
                  <TableCell align="left">{product.proName}</TableCell>
                  <TableCell align="left"><img src={`http://localhost:9004/api/product/images/${product.proImage}`} alt="" style={{width: "100px", height: "100px"}}/></TableCell>
                  <TableCell align="right">{product.proPrice}</TableCell>
                  <TableCell align="left">{product.proDesc}</TableCell>
                  <TableCell align="right">{product.proQuantity}</TableCell>
                  <TableCell align="left">{product.category.cateName}</TableCell>
                  <TableCell align="left">{product.brand.brandName}</TableCell>
                  <TableCell align="left">
                    {product.proStatus == 1 ? 
                        <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Hoạt động</Typography>
                    : product.proStatus == 0 ?
                        <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Vô hiệu hóa</Typography>
                    :   <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đã xóa</Typography>
                    }
                    </TableCell>
                  <TableCell align="right">{formatDateTime(product.proCreatedAt)}</TableCell>
                  <TableCell align="right">{formatDateTime(product.proUpdatedAt)}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2}>
                      <ProductEditForm
                        data={{id: product.proId, name: product.proName, price: product.proPrice, desc: product.proDesc, quantity: product.proQuantity, category: product.category.cateId, brand: product.brand.brandId, status: product.proStatus, image: product.proImage}} />
                      <ConfirmDeleteProduct deleteID={product.proId}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}