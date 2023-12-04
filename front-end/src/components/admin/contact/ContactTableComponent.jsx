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
import { fetchContacts } from "../../../slices/contactSlice";
import ConfirmContactComponent from "./ConfirmContactCompoentn";
import ConfirmDeleteBlogComponent from "../blog/ComfirmDeleteBlogComponent";
import ConfirmDeleteContactComponent from "./ConfirmDeleteContactComponent";

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

export default function ContactTableComponent() {
  console.log("check render ContactTableComponent");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector((state) => state.contact.contacts);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Tiêu đề</TableCell>
            <TableCell align="left">Nội dung</TableCell>
            <TableCell align="left">Tên liên hệ</TableCell>
            <TableCell align="left">Số điện thoại</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.contactId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                #{contact.contactId}
              </TableCell>
              <TableCell align="left">
                {contact.contactTitle.slice(0, 100)}...
              </TableCell>
              <TableCell align="left">
                {contact.contactContent.slice(0, 200)}...
              </TableCell>
              <TableCell align="left">{contact.contactUsername}</TableCell>
              <TableCell align="left">{contact.contactUserphone}</TableCell>
              <TableCell align="left">{contact.contactUserEmail}</TableCell>
              <TableCell align="left">
                    {contact.contactStatus==1?<Typography variant="body1" sx={{color: '#ff3d00 ', width: "10vh"}}>Đang chờ</Typography>
                    : <Typography variant="body1" sx={{color: '#00a152'}}>Đã xác nhận</Typography>}
                  </TableCell>
              <TableCell align="center">
                <Stack direction="row" spacing={1} sx={{width: '25vh'}}>
                  {contact.contactStatus == 1 ? <ConfirmContactComponent contact={contact} /> : ""}
                  <ConfirmDeleteContactComponent contact={contact} />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
