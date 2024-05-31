import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, formatDateTime } from "../../customize/CustomizeComponent";
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";



import ConfirmDeleteBrand from "../../../components/admin/brand/ConfirmDeleteBrand";
import BrandEditForm from "../../../components/admin/brand/BrandEditForm";
import { fetchBrands } from "../../../slices/brandSlice";
import { useCallback } from "react";
import { useState } from "react";


export default function BrandTable() {
    console.log("BrandTable");

    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brand.brands);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedBrandDelete, setSelectedBrandDelete] = useState(null);

    React.useEffect(() => {
        dispatch((fetchBrands()));
    }, [dispatch]);

    const handleClickBrand = useCallback((brand) => {
      console.log("handleClickBrand: ", brand.brandId);
      setSelectedBrand(brand);
    }, []);

    const handleClickBrandDelete = useCallback((brand) => {
      console.log("handleClickBrandDelete: ", brand.brandId);
      setSelectedBrandDelete(brand);
    }, []);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [successSnackbarContent, setSuccessSnackbarContent] = React.useState(false);
    const handleOpenSuccessSnackbar = (content) => {
      setOpenSuccessSnackbar(true);
      setSuccessSnackbarContent(content);
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
                      {/* <BrandEditForm data={{id: brand.brandId, name: brand.brandName, desc: brand.brandDesc, status: brand.brandStatus}} /> */}
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<EditIcon />}
                        onClick={() => handleClickBrand(brand)}
                      >
                        Cập nhật
                      </Button>
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => handleClickBrandDelete(brand)}>
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {
            selectedBrand && (
              <BrandEditForm brand={selectedBrand} onClose={() => setSelectedBrand(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar} />
            )
          }
          {
            selectedBrandDelete && (
              <ConfirmDeleteBrand brand={selectedBrandDelete} onClose={() => setSelectedBrandDelete(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar} />
            )
          }
        </TableContainer>
        <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
          <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
            {successSnackbarContent}
          </Alert>
        </Snackbar></>
    )
}