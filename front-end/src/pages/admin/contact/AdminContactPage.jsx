import * as React from "react";

import ReviewTableComponent from "../../../components/admin/review/ReviewTableComponent";
import BlogTableComponent from "../../../components/admin/blog/BlogTableComponent";
import BlogAddComponent from "../../../components/admin/blog/BlogAddComponent";
import { Button, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContactTableComponent from "../../../components/admin/contact/ContactTableComponent";
import FilterContactTable from "../../../components/admin/contact/FilterContactTable";

export default function AdminContactPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ LIÊN HỆ</h1>
      <div style={{ height: 400, width: "100%" }}>
        <FilterContactTable />
        <ContactTableComponent />
      </div>
    </>
  );
}

