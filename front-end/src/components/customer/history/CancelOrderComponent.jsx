
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

import CancelIcon from '@mui/icons-material/Cancel';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function CancelOrderComponent (props) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
        <Button size="small" variant="outlined" startIcon={<CancelIcon />} color="error" onClick={handleClickOpen}>Yêu cầu hủy</Button>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Xác nhận hủy đơn hàng"}</DialogTitle>
            <DialogContent>
                Đang xây dựng
            
                {/* <FormControl fullWidth sx={{mt: 3, width: '34rem'}}>
                    <InputLabel id="demo-simple-select-label">Nhà Cung Cấp</InputLabel>
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
                {importDetails} */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Xác nhận</Button>
                <Button onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}