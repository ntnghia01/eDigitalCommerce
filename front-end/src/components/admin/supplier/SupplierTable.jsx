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



import ComfirmDeleteBrand from "../../../components/admin/brand/ConfirmDeleteBrand";
import BrandEditForm from "../../../components/admin/brand/BrandEditForm";
import { fetchBrands } from "../../../slices/brandSlice";
import { fetchSuppliers } from "../../../slices/supplierSlice";
import SupplierEditForm from "./SupplierEditForm";
import ConfirmDeleteSupplier from "./ConfirmDeleteSupplier";

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

export default function SuppierTable() {

    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.supplier.suppliers);

    React.useEffect(() => {
        dispatch((fetchSuppliers()));
    }, [dispatch]);
    console.log(suppliers);
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Nhà Cung Cấp</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Số điện thoại</TableCell>
                <TableCell align="left">Địa chỉ</TableCell>
                <TableCell align="left">Trạng Thái</TableCell>
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
              {suppliers.map((supplier) => (
                <TableRow
                  key={supplier.supplierId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {supplier.supplierId}
                  </TableCell>
                  <TableCell align="left">{supplier.supplierName}</TableCell>
                  <TableCell align="left">{supplier.supplierEmail}</TableCell>
                  <TableCell align="left">{supplier.supplierPhone}</TableCell>
                  <TableCell align="left">{supplier.supplierAddress}</TableCell>
                  <TableCell align="left">
                    {supplier.supplierStatus == 1 ? 
                    <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đang hoạt động</Typography>
                    : supplier.supplierStatus == 0 ?
                    <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Vô hiệu hóa</Typography>
                    : <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đã xóa</Typography>
                  }
                    </TableCell>
                  <TableCell align="right">{formatDateTime(supplier.supplierCreatedAt)}</TableCell>
                  <TableCell align="right">{formatDateTime(supplier.supplierUpdatedAt)}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <SupplierEditForm data={{id: supplier.supplierId, name: supplier.supplierName, email: supplier.supplierEmail, phone: supplier.supplierPhone, address: supplier.supplierAddress, status: supplier.supplierStatus}} />
                      <ConfirmDeleteSupplier deleteID={supplier.supplierId}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}