import CustomerTopBar from "../../components/customer/CustomerTopBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProductListComponent from "./ProductListComponent";
import ProductDetail from "./ProductDetail";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import CustomerLoginPage from "./login";
import CustomerSignupPage from "./signup";
import Cart from "./cart";
import CheckoutPage from "./checkout/CheckoutPage";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import OrderHistoryPage from "./history/OrderHistoryPage";
import SuccessfulPaymentPage from "./success/SuccessfulPaymentPage";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

export default function CustomerPage() {
  return (
    <>
      <Box sx={{ flexGrow: 1, backgroundColor: "#eeeeee" }}>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            sx={{ backgroundColor: "white" }}
            style={{ paddingLeft: 0 }}
          >
            <CustomerTopBar />

            <Routes>
              <Route path="/" element={<ProductListComponent />} />
              <Route path="/login" element={<CustomerLoginPage />} />
              <Route path="/signup" element={<CustomerSignupPage />} />
              <Route path="/product/detail/:proId" element={<ProductDetail />} />
              <Route path="/cart/:customerId" element={<Cart />} />
              <Route path="/checkout/:customerId" element={<CheckoutPage />} />
              <Route path="/history/:customerId" element={<OrderHistoryPage />} />
              <Route path="/successfulpayment" element={<SuccessfulPaymentPage />} />
            </Routes>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1, 
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </Box>
    </>
  );
}
