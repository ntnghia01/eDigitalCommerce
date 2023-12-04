import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { fetchImports } from "../../../slices/importSlice";
import {
  fetchOrder,
  getOrderDetailByOrderId,
} from "../../../slices/orderSlice";
import { useEffect } from "react";
import { fetchReviews } from "../../../slices/reviewSlice";
import { fetchBlogs } from "../../../slices/blogSlice";
import BlogEditForm from "./BlogEditComponent";
import ConfirmDeleteBlogComponent from "./ComfirmDeleteBlogComponent";

const formatDateTime = (oriDateTime) => {
  const dateTime = new Date(oriDateTime);
  const date = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const hour = dateTime.getHours();
  const minute = dateTime.getMinutes();
  const second = dateTime.getSeconds();

  const newDateTime = `${date < 10 ? "0" : ""}${date}-${
    month < 10 ? "0" : ""
  }${month}-${year} ${hour < 10 ? "0" : ""}${hour}:${
    minute < 10 ? "0" : ""
  }${minute}:${second < 10 ? "0" : ""}${second}`;
  return newDateTime;
};

function formatNumberWithCommas(input) {
  if (typeof input === "number" && Number.isInteger(input))
    input = input.toString();
  if (typeof input !== "string") return "Invalid input";
  if (!/^\d+$/.test(input)) return "Invalid input";
  return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function BlogTableComponent() {
  console.log("check render ReviewTableComponent");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blog.blogs);

  return (
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
                  {/* <ConfirmPayment order={order} /> */}
                  {/* <Button
                    variant="contained"
                    color="warning"
                    startIcon={<EditIcon />}
                  >
                    Sửa
                  </Button> */}
                  <BlogEditForm blog={blog} />
                  {/* <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Xóa
                  </Button> */}
                  <ConfirmDeleteBlogComponent blog={blog} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
