import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from '@mui/material/Snackbar';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";


import { useEffect } from "react";
import { fetchBlogs } from "../../../slices/blogSlice";
import BlogEditForm from "./BlogEditComponent";
import ConfirmDeleteBlogComponent from "./ComfirmDeleteBlogComponent";
import { useState } from "react";
import { Alert } from "../../customize/CustomizeComponent";


export default function BlogTableComponent() {
  console.log("check render ReviewTableComponent");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blog.blogs);

  const [selectedBlogEdit, setSelectedBlogEdit] = useState(null);
  const [selectedBlogDelete, setSelectedBlogDelete] = useState(null);

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

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Tiêu đề</TableCell>
            <TableCell align="left">Hình ảnh</TableCell>
            <TableCell align="left">Nội dung</TableCell>
            <TableCell align="left">Người viết</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow
              key={blog.blogId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                #{blog.blogId}
              </TableCell>
              <TableCell align="left">
                {blog.blogTitle.slice(0, 100)}...
              </TableCell>
              <TableCell align="left">
                <img
                  src={`http://localhost:9004/api/product/images/${blog.blogImage}`}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </TableCell>
              <TableCell align="left">
                {blog.blogContent.slice(0, 200)}...
              </TableCell>
              <TableCell align="left">{blog.user.userName}</TableCell>
              <TableCell align="left">
                {blog.blogStatus == 1 ? 
                  <Typography sx={{backgroundColor:'#4caf50', color:'white', paddingLeft: '1rem', borderRadius: '5rem', width: "9vh"}}>Hiển thị</Typography>
                  : blog.blogStatus == 0 ?
                  <Typography sx={{backgroundColor:'orange', color:'white', paddingLeft: '2rem', borderRadius: '5rem'}}>Ẩn</Typography>
                  : <Typography sx={{backgroundColor:'#ff3d00', color:'white', paddingLeft: '1rem', borderRadius: '5rem'}}>Đã xóa</Typography>}
              </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<EditIcon />}
                    onClick={() => setSelectedBlogEdit(blog)}
                    style={{width: '8rem'}}
                  >
                    Cập nhật
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => setSelectedBlogDelete(blog)}>
                    Xóa
                  </Button>
                </Stack>
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
      selectedBlogEdit && (
        <BlogEditForm blog={selectedBlogEdit} onClose={() => setSelectedBlogEdit(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
      )
    }
    {
      selectedBlogDelete && (
        <ConfirmDeleteBlogComponent blog={selectedBlogDelete} onClose={() => setSelectedBlogDelete(null)} handleOpenSuccessSnackbar={handleOpenSuccessSnackbar}/>
      )
    }
    </>
  );
}
