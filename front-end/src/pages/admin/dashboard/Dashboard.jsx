import * as React from "react";
import { BarChart, LineChart, ScatterChart } from "@mui/x-charts";
import { PieChart, pieArcClasses } from "@mui/x-charts";
import { Box, Grid, Paper, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import PaidIcon from "@mui/icons-material/Paid";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import BarsChart from "./charts/BarsChart";
import PieChartWithCenterLabel from "./charts/PieChartWithCenterLabel";
import BarsChart2 from "./charts/BarsChart2";
import StraightAnglePieChart from "./charts/StraightAnglePieChart";
import StackChart from "./charts/StackChart";
import PieChart2 from "./charts/PieChart2";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { reviewAVG, totalProductQuantity, totalRevenue, totalSoldProducts } from "../../../slices/revenueSlice";

import { formatCurrency } from "../../../components/customize/CustomizeComponent";
import { fetchOrder } from "../../../slices/orderSlice";
import { fetchComments } from "../../../slices/commentSlice";
import { fetchContacts } from "../../../slices/contactSlice";
import { fetchAllUserAccount } from "../../../slices/accountSlice";

const sample = [1, 10, 30, 50, 70, 90, 100];
const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];
const data2 = [
  {
    id: "data-0",
    x1: 329.39,
    x2: 391.29,
    y1: 443.28,
    y2: 153.9,
  },
  {
    id: "data-1",
    x1: 96.94,
    x2: 139.6,
    y1: 110.5,
    y2: 217.8,
  },
  {
    id: "data-2",
    x1: 336.35,
    x2: 282.34,
    y1: 175.23,
    y2: 286.32,
  },
];

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: "Danh mục",
};
const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: "Thương hiệu",
};
const seriesC = {
  data: [3, 2, 4, 5, 1],
  label: "Nhà cung cấp",
};


export default function AdminDashboard() {
  console.log("check");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalRevenue());
    dispatch(fetchOrder());
    dispatch(fetchComments());
    dispatch(reviewAVG());
    dispatch(totalProductQuantity());
    dispatch(totalSoldProducts());
    dispatch(fetchContacts());
    dispatch(fetchAllUserAccount());
    
  },[dispatch])

  const revenue = useSelector((state) => state.revenue.revenue);
  const orders = useSelector((state) => state.order.orders);
  const comments = useSelector((state) => state.comment.comments);
  const reviewAvg = useSelector((state) => state.revenue.reviewAvg);
  const totalProductQuantityValue = useSelector((state) => state.revenue.totalProductQuantityValue);
  const totalSoldProductsValue = useSelector((state) => state.revenue.totalSoldProductsValue);
  const contacts = useSelector((state) => state.contact.contacts);
  const users = useSelector((state) => state.account.users);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>TỔNG QUAN</h1>
      <Box></Box>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #4caf50" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <PaidIcon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng doanh thu
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {formatCurrency(revenue)
                        }
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #2a3eb1" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Inventory2Icon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng đơn hàng
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {orders.length}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #00a0b2" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <MessageIcon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng bình luận
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {comments.length}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #ef6c00", height: 133 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <StarBorderPurple500Icon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Đánh giá trung bình
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <Rating name="read-only" value={reviewAvg} readOnly />
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #78909c" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <PaidIcon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng sản phẩm trong kho
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {totalProductQuantityValue}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #4db6ac" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Inventory2Icon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng sản phẩm đã bán
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {totalSoldProductsValue}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #c0ca33" }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <MessageIcon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Lượt liên hệ
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {contacts.length}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            sx={{ padding: 4, boxShadow: "0px 4px 8px #2e7d32", height: 133 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <StarBorderPurple500Icon fontSize="large" />
              <div>
                <Typography variant="h6" gutterBottom>
                  Tổng thành viên hiện tại
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {users.length}
                </Typography>
              </div>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <BarsChart2 />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <PieChartWithCenterLabel />
            <PieChart2 />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          
          <Paper elevation={3}>
              <BarsChart />
            </Paper>
        </Grid>
        {/* <Grid item xs={4}>
          <Paper elevation={3}>
            <ScatterChart
              width={500}
              height={300}
              series={[
                {
                  label: "Đăng ký",
                  data: data2.map((v) => ({ x: v.x1, y: v.y1, id: v.id })),
                },
                {
                  label: "Xóa",
                  data: data2.map((v) => ({ x: v.x1, y: v.y2, id: v.id })),
                },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          
          <Paper elevation={3}>
            <BarChart
              width={500}
              height={300}
              series={[
                { ...seriesA, stack: "total" },
                { ...seriesB, stack: "total" },
                { ...seriesC, stack: "total" },
              ]}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3}>
            <StackChart />
          </Paper>
        </Grid> */}


      </Grid>
    </>
  );
}
