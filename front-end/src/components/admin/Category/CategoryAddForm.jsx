import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

// import Icons
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CategoryAddForm() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Thêm mới
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm Mới Danh Mục"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Nhập tên danh mục"
            type="text"
            fullWidth
            variant="standard"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <AccountCircle />
            //     </InputAdornment>
            //   ),
            // }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Nhập mô tả danh mục"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}