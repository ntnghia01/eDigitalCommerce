import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import { Select, TextField } from "@mui/material";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ImportAddForm() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
            >
                {supplierData.map((supplier) => (
                    <MenuItem key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          {importDetails}
        </DialogContent>
        <Button variant="outlined" onClick={handleAddDetailClick}>Thêm chi tiết</Button>
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
