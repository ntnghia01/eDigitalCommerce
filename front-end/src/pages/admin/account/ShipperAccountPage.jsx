import * as React from "react";

import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import CustomerAccountTableComponent from "../../../components/admin/account/customer/CustomerAccountTableComponent";
import ShipperAccountTableComponent from "../../../components/admin/account/shipper/ShipperAccountTableComponent";

export default function ShipperAccountPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ TÀI KHOẢN NGƯỜI GIAO HÀNG</h1>
      <div style={{ height: 400, width: "100%" }}>
        <ShipperAccountTableComponent />
      </div>
    </>
  );
}

