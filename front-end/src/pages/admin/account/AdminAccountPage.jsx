import * as React from "react";

// import Redux
import { useSelector, useDispatch } from "react-redux";

// import MUI
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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

import { fetchImports } from "../../../slices/importSlice";
import { fetchOrder, getOrderDetailByOrderId } from "../../../slices/orderSlice";

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

function formatNumberWithCommas(input) {
    if (typeof input === "number" && Number.isInteger(input)) input = input.toString();
    if (typeof input !== "string") return "Invalid input";
    if (!/^\d+$/.test(input)) return "Invalid input";
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  

export default function AdminAccountPage() {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders);

    React.useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);
    // console.log(products);

    
    return (
        <>Admin</>
    )
}