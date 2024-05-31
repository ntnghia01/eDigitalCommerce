import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
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

import { fetchSuppliers } from "../../../slices/supplierSlice";
import SupplierEditForm from "./SupplierEditForm";
import ConfirmDeleteSupplier from "./ConfirmDeleteSupplier";
import { formatDateTime, Alert } from "../../customize/CustomizeComponent";
import { useState } from "react";


export default function SuppierTable() {

  console.log("SuppierTable");

    const dispatch = useDispatch();
    const suppliers = useSelector((state) => state.supplier.suppliers);

    React.useEffect(() => {
        dispatch((fetchSuppliers()));
    }, [dispatch]);

    const [selectedSupplierEdit, setSelectedSupplierEdit] = useState(null);
    const [selectedSupplierDelete, setSelectedSupplierDelete] = useState(null);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
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
                <TableCell align="left">Nhà Cung Cấp</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Số điện thoại</TableCell>
                <TableCell align="left">Địa chỉ</TableCell>
                <TableCell align="left">Trạng Thái</TableCell>
                <TableCell align="right">
                  Ngày Tạo&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell>
                {/* <TableCell align="right">
                  Ngày Cập Nhật&nbsp;(dd-mm-yyyy hh-mm-ss)
                </TableCell> */}
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
                    #{supplier.supplierId}
                  </TableCell>
                  <TableCell align="left">{supplier.supplierName}</TableCell>
                  <TableCell align="left">{supplier.supplierEmail}</TableCell>
                  <TableCell align="left">{supplier.supplierPhone}</TableCell>
                  <TableCell align="left">{supplier.supplierAddress}</TableCell>
                  <TableCell align="left">
                    {supplier.supplierStatus == 1 ? 
                    <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem', width: "10vh"}}>Hoạt động</Typography>
                    : supplier.supplierStatus == 0 ?
                    <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '0.6rem', borderRadius: '5rem'}}>Vô hiệu hóa</Typography>
                    : <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đã xóa</Typography>
                  }
                    </TableCell>
                  <TableCell align="right">{formatDateTime(supplier.supplierCreatedAt)}</TableCell>
                  {/* <TableCell align="right">{formatDateTime(supplier.supplierUpdatedAt)}</TableCell> */}
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="warning"
                        startIcon={<EditIcon />}
                        onClick={() => setSelectedSupplierEdit(supplier)}
                        style={{width: '8rem'}}
                      >
                        Cập nhật
                      </Button>
                      <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => setSelectedSupplierDelete(supplier)}>
                        Xóa
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          selectedSupplierEdit && (
            <SupplierEditForm supplier={selectedSupplierEdit} onClose={() => setSelectedSupplierEdit(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
          )
        }
        {
          selectedSupplierDelete && (
            <ConfirmDeleteSupplier supplier={selectedSupplierDelete} onClose={() => setSelectedSupplierDelete(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
          )
        }
        <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
          <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
            {snackbarSuccessContent}
          </Alert>
        </Snackbar>
      </>
    )
}