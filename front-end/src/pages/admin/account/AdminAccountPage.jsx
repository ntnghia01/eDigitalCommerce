import * as React from "react";

import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import CustomerAccountTableComponent from "../../../components/admin/account/customer/CustomerAccountTableComponent";
import AdminAccountTableComponent from "../../../components/admin/account/admin/AdminAccountTableComponent";
import FilterCustomerAccountTable from "../../../components/admin/account/customer/FilterCustomerAccountTable";
import { Button, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AdminAccountPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ TÀI KHOẢN QUẢN TRỊ VIÊN</h1>
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
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              // onClick={handleClickOpen}
              >
              Thêm tài khoản
            </Button>
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
        <FilterCustomerAccountTable />
        <AdminAccountTableComponent />
      </div>
    </>
  );
}

