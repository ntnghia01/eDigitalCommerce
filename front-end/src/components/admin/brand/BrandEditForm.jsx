import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

// import Icons
import UpdateIcon from "@mui/icons-material/Update";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import FormLabel from '@mui/material/FormLabel';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BrandEditForm(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        startIcon={<UpdateIcon />}
        onClick={handleClickOpen}
      >
        Cập nhật
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{`Chỉnh Sửa Thương Hiệu ID=${props.data.id}`}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Tên danh mục
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="cate_name"
            label="Tên thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={`${props.data.name}`}
          />
          <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Mô tả thương hiệu"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={`${props.data.desc}`}
          />
          {/* <TextField
            autoFocus
            margin="dense"
            id="cate_desc"
            label="Trạng thái"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          {/* <FormLabel id="demo-row-radio-buttons-group-label" >Trạng thái</FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={`${props.data.status}`}
          >
            <FormControlLabel value="1" control={<Radio />} label="Hoạt động" />
            <FormControlLabel value="0" control={<Radio />} label="Không hoạt động" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Xác nhận</Button>
          <Button onClick={handleClose}>Hủy</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
