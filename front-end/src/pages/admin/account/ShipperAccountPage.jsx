import * as React from "react";

import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import CustomerAccountTableComponent from "../../../components/admin/account/customer/CustomerAccountTableComponent";
import ShipperAccountTableComponent from "../../../components/admin/account/shipper/ShipperAccountTableComponent";
import FilterCustomerAccountTable from "../../../components/admin/account/customer/FilterCustomerAccountTable";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterShipperAccountTable from "../../../components/admin/account/shipper/FilterShipperAccountTable";
import AddShipperAccount from "../../../components/admin/account/shipper/AddShipperAccount";

export default function ShipperAccountPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ TÀI KHOẢN NGƯỜI GIAO HÀNG</h1>
      <div style={{ height: 400, width: "100%" }}>
      <Grid container spacing={2} marginBottom={2}>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {/* <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              // onClick={handleClickOpen}
              >
              Thêm tài khoản
            </Button> */}
            <AddShipperAccount />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
          </Grid>
        </Grid>
        <FilterShipperAccountTable />
        <ShipperAccountTableComponent />
      </div>
    </>
  );
}

