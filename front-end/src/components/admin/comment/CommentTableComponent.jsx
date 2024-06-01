import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { useEffect } from "react";
import { fetchComments } from "../../../slices/commentSlice";
import DisableCommentComponent from "./DisableCommentComponent";
import ActiveCommentComponent from "./ActiveCommentComponent";
import { useState } from "react";
import { Alert } from "../../customize/CustomizeComponent";


  

export default function CommentTableComponent() {
    console.log("CommentTableComponent");

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment.comments);

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const [selectedActive, setSelectedActive] = useState(null);
    const [selectedDisable, setSelectedDisable] = useState(null);

    const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
    const [snackbarContent, setSnackbarContent] = useState("Cập nhật thành công");
    const handleOpenSuccessSnackbar = (content) => {
      setOpenSuccessSnackbar(true);
      setSnackbarContent(content);
    };
    const handleCloseSuccessSnackbar = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenSuccessSnackbar(false);
    };
    
    return (<>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Thời điểm bình luận</TableCell>
                <TableCell align="left">Sản phẩm</TableCell>
                <TableCell align="left">Nội dung</TableCell>
                <TableCell align="left">Người bình luận</TableCell>
                <TableCell align="left">Trạng thái</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map((comment) => (
                <TableRow
                  key={comment.cmtId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">#{comment.cmtId}</TableCell>
                  <TableCell align="left">{comment.cmtTime}</TableCell>
                  <TableCell align="left">{comment.product.proName}</TableCell>
                  {/* <TableCell align="right">{formatDateTime(order.orderShipExpected)}</TableCell> */}
                  <TableCell align="left">{comment.cmtContent}</TableCell>
                  {/* <TableCell align="left">{order.admin==null?'Trống':order.admin.adminName}</TableCell> */}
                  <TableCell align="left">{comment.user.userName}</TableCell>
                  <TableCell align="left">
                    {comment.cmtStatus==1?<Typography variant="body1" sx={{color: '#00a152'}}>Hiển thị</Typography>
                    : <Typography variant="body1" sx={{color: '#b23c17'}}>Đã ẩn</Typography>}
                  </TableCell>
                  <TableCell align="center">
                    {comment.cmtStatus==1 ? // Activing
                      <Button startIcon={<CommentsDisabledIcon />} onClick={() => setSelectedDisable(comment)}>
                        Ẩn
                      </Button>
                    : comment.cmtStatus==0 ? // Disabling
                      <Button startIcon={<InsertCommentIcon />} onClick={() => setSelectedActive(comment)}>
                        Hiển thị
                      </Button>
                    : "Không xác định"
                    }
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Snackbar open={openSuccessSnackbar} autoHideDuration={3000} onClose={handleCloseSuccessSnackbar}>
          <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%', color: 'white' }}>
            {snackbarContent}
          </Alert>
        </Snackbar>
        {
          selectedActive && (
            <ActiveCommentComponent comment={selectedActive} onClose={() => setSelectedActive(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
          )
        }
        {
          selectedDisable && (
            <DisableCommentComponent comment={selectedDisable} onClose={() => setSelectedDisable(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
          )
        }
        </>
    )
}