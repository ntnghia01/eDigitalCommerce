import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { Select, TextField, Typography } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchSuppliers } from "../../../slices/supplierSlice";
import ImportDetail from "./ImportDetail";
import { addImport, fetchImports } from "../../../slices/importSlice";
import { useState } from "react";
import { Transition, Alert } from "../../../components/customize/CustomizeComponent";

export default function ImportAddForm() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNull();
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const dispatch = useDispatch();

  const supplierData = useSelector((state) => state.supplier.suppliers);
  const [importDetails, setImportDetails] = React.useState([]);
  const [importDetailData, setImportDeTailData] = React.useState([]);

  const [isNull, setIsNull] = useState();

  React.useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const [supplierId, setSupplierID] = React.useState();
  const [adminId, setAdminID] = React.useState(localStorage.getItem("adminID"));
  let importTotal = 0;

  const handleAddDetailClick = () => {
    const updatedImportDetails = [...importDetails, <ImportDetail key={importDetails.length} onSave={handleDetailSave}/>];
    setImportDetails(updatedImportDetails);
  };

  const handleDetailSave = (data) => {
    // Thêm dữ liệu từ mỗi ImportDetail vào mảng importDetailData
    setImportDeTailData((prevData) => [...prevData, data]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!supplierId) {
      setIsNull("supplierId");
    } else if (importDetails.length <= 0) {
      setIsNull("importDetails");
    } else {
      importDetailData.map((detail) => {
        importTotal += (detail.importDetailQuantity)*(detail.importDetailPrice);
      })
      const newImport = {
        supplier: supplierId,
        userId: adminId,
        importTotal: importTotal
      };
      // console.log(newImport);
      // console.log(importDetailData);
      dispatch(addImport({importData: newImport, importDetailData: importDetailData}))
        .then(() => {
          dispatch(fetchImports());
          handleOpenSnackbar();
          console.log("Nhập hàng thành công!");
          setOpen(false);
          setImportDetails([]);
        })
        .catch((error) => {
          console.log("Thêm thất bại: " + error);
        });
    }
    
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Nhập Hàng
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Nhập Hàng"}</DialogTitle>
        <DialogContent>
          
          <FormControl fullWidth sx={{mt: 3, width: '34rem'}}>
            <InputLabel id="demo-simple-select-label">Nhà Cung Cấp *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              fullWidth
              label="Nhà cung cấp"
              onChange={(e) => {
                setSupplierID(e.target.value);
              }}
              required
              error={isNull == 'supplierId' ? true : false}
            >
                {supplierData.map((supplier) => (
                    <MenuItem key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          {importDetails}
        </DialogContent>
        <Button variant="outlined" onClick={handleAddDetailClick} style={{margin: 5}}>Thêm chi tiết</Button>
        {
          isNull == 'importDetails' ? <Typography color="red" fontSize={15} style={{margin: 5}}>*Vui lòng thêm ít nhất một chi tiết</Typography> : null
        }
        <DialogActions>
          <Button onClick={handleSubmit}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
          Thêm mới thành công!
        </Alert>
      </Snackbar>
    </div>
  );
}
