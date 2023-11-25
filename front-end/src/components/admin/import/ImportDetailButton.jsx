import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import InfoIcon from "@mui/icons-material/Info";
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
import { fetchImportDetails } from "../../../slices/importSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input))
    input = input.toString();
  if (typeof input !== "string") return "Invalid input";
  if (!/^\d+$/.test(input)) return "Invalid input";
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ImportDetailButton(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const importDetails = useSelector((state) => state.import.importDetails);
  const handleClickOpen = () => {
    setOpen(true);
    console.log(props.importID);
    dispatch(fetchImportDetails(props.importID));
    console.log(importDetails);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<InfoIcon />}
        onClick={handleClickOpen}
      >
        Chi tiết
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chi Tiết Nhập Kho ID=${props.importID}`}</DialogTitle>
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
}
