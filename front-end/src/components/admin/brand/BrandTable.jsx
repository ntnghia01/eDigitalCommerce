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

export default function BrandTable() {
    console.log("BrandTable");

    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);

    React.useEffect(() => {
        dispatch((fetchBrands()));
    }, [dispatch]);
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Tên Thương Hiệu</TableCell>
                <TableCell align="left">Mô Tả</TableCell>
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
              {brands.map((brand) => (
                <TableRow
                  key={brand.brandId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    #{brand.brandId}
                  </TableCell>
                  <TableCell align="left">{brand.brandName}</TableCell>
                  <TableCell align="left">{brand.brandDesc}</TableCell>
                  <TableCell align="left">
                    {brand.brandStatus == 1 ? 
                    <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem', maxWidth: "95%"}}>Đang hoạt động</Typography>
                    : brand.brandStatus == 0 ?
                    <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '1rem', borderRadius: '5rem', maxWidth: "75%"}}>Vô hiệu hóa</Typography>
                    : <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem', maxWidth: "75%"}}>Đã xóa</Typography>
                  }
                    </TableCell>
                  <TableCell align="right">{formatDateTime(brand.brandCreatedAt)}</TableCell>
                  <TableCell align="right">{formatDateTime(brand.brandUpdatedAt)}</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <BrandEditForm data={{id: brand.brandId, name: brand.brandName, desc: brand.brandDesc, status: brand.brandStatus}} />
                      <ComfirmDeleteBrand deleteID={brand.brandId}/>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}