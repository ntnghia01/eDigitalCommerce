import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import { Transition, formatNumberWithCommas } from "../../customize/CustomizeComponent";


const ImportDetailButton = memo(({import1, onClose}) => {
  console.log("ImportDetailButton", import1.importId);

  const [open, setOpen] = React.useState(true);
  const importDetails = useSelector((state) => state.import.importDetails);
  const handleClose = () => {
    setOpen(false);
    onClose();
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
        <DialogTitle>{`Chi Tiết Phiếu Nhập Hàng #${import1.importId}`}</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Sản phẩm</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {importDetails.map((importDetail) => (
                  <TableRow
                    key={importDetail.importDetailId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {importDetail.importDetailId}
                    </TableCell>
                    <TableCell align="left">
                      {importDetail.product.proName}
                    </TableCell>
                    <TableCell align="left">
                      {formatNumberWithCommas(importDetail.importDetailPrice)}
                    </TableCell>
                    <TableCell align="right">
                      {importDetail.importDetailQuantity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
})

export default ImportDetailButton;
