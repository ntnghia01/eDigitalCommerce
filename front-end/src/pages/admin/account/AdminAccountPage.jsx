import * as React from "react";

import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import CustomerAccountTableComponent from "../../../components/admin/account/customer/CustomerAccountTableComponent";
import AdminAccountTableComponent from "../../../components/admin/account/admin/AdminAccountTableComponent";

export default function AdminAccountPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ TÀI KHOẢN QUẢN TRỊ VIÊN</h1>
      <div style={{ height: 400, width: "100%" }}>
        <AdminAccountTableComponent />
      </div>
    </>
  );
}

