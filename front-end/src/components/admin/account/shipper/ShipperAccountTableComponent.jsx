import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

import {
  Avatar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useEffect } from "react";
import { fetchCustomerAccounts, fetchShipperAccounts } from "../../../../slices/accountSlice";
import DisableShipperAccountComponent from "./DisableShipperAccountComponent";

const formatDateTime = (oriDateTime) => {
    const dateTime = new Date(oriDateTime);
    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    const newDateTime = `${date < 10 ? '0' : ''}${date}-${month < 10 ? '0' : ''}${month}-${year} ${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
    return newDateTime;
}

function convertMillisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng ngày và tháng để đảm bảo có hai chữ số
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Trả về chuỗi ngày/tháng/năm
  return `${formattedDay}-${formattedMonth}-${year}`;
}
  

export default function ShipperAccountTableComponent() {
    console.log("check render ShipperAccountTableComponent");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchShipperAccounts());
    }, [dispatch]);

    const shipperAccounts = useSelector((state) => state.account.shipperAccounts);

    return (<>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">Ảnh</TableCell>
                <TableCell align="left">Họ tên</TableCell>
                <TableCell align="left">Số điện thoại</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Giới tính</TableCell>
                <TableCell align="left">Ngày sinh</TableCell>
                <TableCell align="left">Ngày tạo</TableCell>
                <TableCell align="center">Trạng thái</TableCell>
                <TableCell align="center">Thao Tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipperAccounts.map((account) => (
                <TableRow
                  key={account.userId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">#{account.userId}</TableCell>
                  <TableCell align="center">
                  {account.userImage == null ? (
                      <Avatar
                        alt="User"
                        src={`../../../public/avatar.png`}
                      />) : 
                      (<Avatar
                        alt="Remy Sharp"
                        src={`http://localhost:9004/api/product/images/${account.userImage}`}
                      />)
                    }
                  </TableCell>
                  <TableCell align="left">{account.userName}</TableCell>
                  <TableCell align="left">{account.userPhone}</TableCell>
                  <TableCell align="left">{account.userEmail}</TableCell>
                  <TableCell align="left">{account.userSex==1?"Nam":account.userSex==2?"Nữ":"Khác"}</TableCell>
                  <TableCell align="left">{convertMillisecondsToDate(account.userBirthday)}</TableCell>
                  <TableCell align="left">{account.userCreatedAt}</TableCell>
                  {/* <TableCell align="left">{account.userRole}</TableCell> */}
                  <TableCell align="left" color="red">
                    {account.userStatus == 1 ? 
                    <Typography sx={{backgroundColor:'#4caf50', color:'white', borderRadius: '5rem', textAlign: "center"}}>Đang sử dụng</Typography>
                    : account.userStatus == 0 ?
                    <Typography sx={{backgroundColor:'orange', color:'white', borderRadius: '5rem', textAlign: "center"}}>Bị khóa</Typography>
                    : <Typography sx={{backgroundColor:'#ff3d00', color:'white', borderRadius: '5rem', textAlign: "center"}}>Không xác định</Typography>}
                  </TableCell>
                  <TableCell align="center">
                    {account.userStatus==1 ?
                        <DisableShipperAccountComponent account={account} />
                    : account.userStatus==0 ?
                        <ActiveCustomerAccountComponent account={account} />
                    : "Không xác định"
                    }
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>
    )
}