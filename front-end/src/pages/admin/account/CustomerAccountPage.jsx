import * as React from "react";

import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import CustomerAccountTableComponent from "../../../components/admin/account/customer/CustomerAccountTableComponent";

export default function CustomerAccountPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ TÀI KHOẢN KHÁCH HÀNG</h1>
      <div style={{ height: 400, width: "100%" }}>
        <CustomerAccountTableComponent />
      </div>
    </>
  );
}

