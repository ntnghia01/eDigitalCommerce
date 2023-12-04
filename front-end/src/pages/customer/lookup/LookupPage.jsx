import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SearchIconWrapper,
  StyledBreadcrumb,
  StyledInputBase,
} from "../../../components/customize/CustomizeComponent";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import {
  getOrderDetailByOrderId,
  lookupOrder,
} from "../../../slices/orderSlice";
import { useState } from "react";
import {
  formatDateTime,
  formatNumberWithCommas,
} from "../../../components/customize/CustomizeComponent";
import StepContent from "@mui/material/StepContent";

const steps1 = [
  "Đang chờ xử lý",
  "Đã duyệt",
  "Đang giao",
  "Đã giao",
  "Hoàn thành",
  "Đánh giá",
];

export default function LookupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lookupKeyword, setLookupKeyword] = useState("");

  const handleLookup = () => {
    const lookupData = {
      orderCode: lookupKeyword,
    };
    dispatch(lookupOrder(lookupData)).then(() => {
      console.log("OK");
    });
    dispatch(getOrderDetailByOrderId(1));
  };

  const order = useSelector((state) => state.order.lookedUpOrder);
  const orderDetails = useSelector((state) => state.order.orderDetails);

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginLeft: 3 }}>
        <StyledBreadcrumb
          label="Trang chủ"
          component="a"
          // href="#"
          onClick={() => {
            navigate("/");
          }}
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb
          label="Tra cứu đơn hàng"
          component="a"
          icon={<SearchIcon fontSize="small" />}
        />
      </Breadcrumbs>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <TextField
          // fullWidth
          label="Nhập mã đơn hàng"
          variant="outlined"
          value={lookupKeyword}
          onChange={(e) => setLookupKeyword(e.target.value)}
          sx={{ marginRight: "10px", width: "100vh" }}
        />
        <Button
          variant="contained"
          onClick={handleLookup}
          startIcon={<SearchIcon />}
        >
          Tra cứu
        </Button>
      </Box>

      {order != null ? (
        <>
          {/* <Box sx={{ width: "100%", marginTop: 4 }}>
            <Stepper activeStep={order.orderStatus - 1} alternativeLabel>
              {steps1.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box> */}
          <Typography variant="h4" sx={{ textAlign: "center", marginTop: 3 }}>
            Thông tin đơn hàng
          </Typography>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ padding: 4 }}
          >
            <Grid item xs={6}>
              <Typography variant="h5" sx={{ textAlign: "center", margin: 1 }}>
                Trạng thái đơn hàng
              </Typography>

              <Box sx={{ maxWidth: "100%", display: 'flex', justifyContent: 'center' }}>
                <Stepper activeStep={order.orderStatus-1} orientation="vertical">
                  <Step key={1}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Đang chờ xử lý</Typography>
                        <div>{order.orderCreatedAt != null ? order.orderCreatedAt :""}</div>
                      </Stack>
                    </StepLabel>
                  </Step>
                  <Step key={2}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Đang chờ giao</Typography>
                        <div>{order.orderConfirmed != null ? order.orderConfirmed :""}</div>
                      </Stack>
                    </StepLabel>
                  </Step>
                  <Step key={3}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Đang giao</Typography>
                        <div>{order.orderShipping != null ? order.orderShipping :""}</div>
                      </Stack>
                    </StepLabel>
                  </Step>
                  <Step key={4}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Đã giao</Typography>
                        <div>{order.orderShipped != null ? order.orderShipped :""}</div>
                      </Stack>
                    </StepLabel>
                  </Step>
                  <Step key={5}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Hoàn thành</Typography>
                        <div>{order.orderCompleted != null ? order.orderCompleted :""}</div>
                      </Stack>
                    </StepLabel>
                  </Step>
                  <Step key={6}>
                    <StepLabel>
                      <Stack>
                        <Typography variant="h6">Đánh giá</Typography>
                        {/* <div>{order.orderConfirmed != null ? order.orderConfirmed :""}</div> */}
                      </Stack>
                    </StepLabel>
                  </Step>
                </Stepper>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ borderLeft: 1 }}>
              <Typography variant="h5" sx={{ textAlign: "center", margin: 1 }}>
                Chi tiết đơn hàng
              </Typography>
              <Stack spacing={3}>
                {orderDetails.map((orderDetail) => (
                  <Grid
                    key={orderDetail.orderDetailId}
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    //   spacing={10}
                  >
                    <Grid item xs={5} sx={{ textAlign: "center" }}>
                      <img
                        src={`http://localhost:9004/api/product/images/${orderDetail.product.proImage}`}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <div>{orderDetail.product.proName}</div>
                      <div>
                        {formatNumberWithCommas(orderDetail.product.proPrice)}{" "}
                        VNĐ
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div>x {orderDetail.orderDetailQuantity}</div>
                    </Grid>
                  </Grid>
                ))}
              </Stack>
              <Stack spacing={2} sx={{padding: 5}}>
                <div>Tên khách hàng: {order.user.userName}</div>
                <div>Hình thức thanh toán: {order.payment.paymentName}</div>
                <div>Mã đơn hàng: {order.orderCode}</div>
                <div>Thời gian đặt hàng: {formatDateTime(order.orderTime)}</div>
                <div>Tên người nhận: {order.orderName}</div>
                <div>Số điện thoại người nhận: {order.orderPhone}</div>
                <div>Địa chỉ nhận: {order.orderAddress}</div>
                <div>Ghi chú: {order.orderNote}</div>
                <div>
                  Dự kiến giao vào: {formatDateTime(order.orderShipExpected)}
                </div>
                {order.shipper != null ? (
                  <div>Tên người giao: {order.shipper.userName}</div>
                ) : (
                  ""
                )}
                {order.orderShipping != null ? (
                  <div>
                    Ngày bắt đầu giao: {formatDateTime(order.orderShipping)}
                  </div>
                ) : (
                  ""
                )}
                {order.orderShipped != null ? (
                  <div>Đã giao ngày: {formatDateTime(order.orderShipped)}</div>
                ) : (
                  ""
                )}
                {order.orderPaid != null ? (
                  <div>Ngày thanh toán: {formatDateTime(order.orderPaid)}</div>
                ) : (
                  ""
                )}
                {order.orderCompleted != null ? (
                  <div>
                    Ngày hoàn thành: {formatDateTime(order.orderCompleted)}
                  </div>
                ) : (
                  ""
                )}
                {order.orderCancelled != null ? (
                  <div>Ngày hủy: {formatDateTime(order.orderCancelled)}</div>
                ) : (
                  ""
                )}
                <h4>
                  Phí giao hàng: {formatNumberWithCommas(order.orderShipFee)}đ
                </h4>
                <h4>
                  Tổng tiền: {formatNumberWithCommas(order.orderTotalAmount)}đ
                </h4>
                <h4>
                  Trạng thái:{" "}
                  { order.orderStatus == 1 ? <Typography sx={{color: '#3f51b5', display: 'inline'}}>Đang chờ xử lý</Typography>
                    : order.orderStatus == 2 ? <Typography sx={{color: '#b2a429', display: 'inline'}}>Đang chờ giao</Typography>
                    : order.orderStatus == 3 ? <Typography sx={{color: '#b23c17', display: 'inline'}}>Đang giao</Typography>
                    : order.orderStatus == 4 ? <Typography sx={{color: '#618833', display: 'inline'}}>Đã giao</Typography>
                    : order.orderStatus == 5 ? <Typography sx={{color: '#00a152', display: 'inline'}}>Đã hoàn thành</Typography>
                    : order.orderStatus == -1 ? <Typography sx={{color: '#ab003c', display: 'inline'}}>Đã hủy</Typography>
                    : "Không xác định"}
                </h4>
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </>
  );
}
