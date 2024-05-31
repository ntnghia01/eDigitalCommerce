import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from "@mui/icons-material/Info";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { fetchImportDetails, fetchImports } from "../../../slices/importSlice";
import ImportDetailButton from "./ImportDetailButton";
import { formatDateTime, Alert } from "../../customize/CustomizeComponent";
import { useState } from "react";



export default function ImportTable() {

  console.log("ImportTable");

    const dispatch = useDispatch();
    const imports = useSelector((state) => state.import.imports);

    React.useEffect(() => {
        dispatch(fetchImports());
    }, [dispatch]);
    // console.log(products);

    const [selectedImport, setSelectedImport] = useState(null);
    const handleClickImportDetail = (import1) => {
      setSelectedImport(import1);
      dispatch(fetchImportDetails(import1.importId));
    }

    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Nhà Cung Cấp</TableCell>
                <TableCell align="left">Người Lập</TableCell>
                <TableCell align="right">Ngày</TableCell>
                <TableCell align="right">Tổng</TableCell>
                <TableCell align="right">Trạng Thái</TableCell>
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
              {imports.map((import1) => (
                <TableRow
                  key={import1.importId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">#{import1.importId}</TableCell>
                  <TableCell align="left">{import1.supplier.supplierName}</TableCell>
                  <TableCell align="left">{import1.user.userName}</TableCell>
                  <TableCell align="right">{import1.importDate}</TableCell>
                  <TableCell align="right">{import1.importTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                  <TableCell align="left">
                    {import1.importStatus == 1 ? 
                        <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1.2rem', borderRadius: '5rem'}}>Tốt</Typography>
                    : import1.importStatus == 0 ?
                        <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Vô hiệu hóa</Typography>
                    :   <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đã xóa</Typography>
                    }
                    </TableCell>
                  <TableCell align="right">{formatDateTime(import1.importCreatedAt)}</TableCell>
                  <TableCell align="right">{formatDateTime(import1.importUpdatedAt)}</TableCell>
                  <TableCell align="left">
                    <Stack spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<InfoIcon />}
                        onClick={() =>  handleClickImportDetail(import1)}
                      >
                        Chi tiết
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {
          selectedImport && (
            <ImportDetailButton import1={selectedImport} onClose={() => setSelectedImport(null)}/>
          )
        }
        </>
    )
}