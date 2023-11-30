import * as React from "react";

import ReviewTableComponent from "../../../components/admin/review/ReviewTableComponent";
import BlogTableComponent from "../../../components/admin/blog/BlogTableComponent";
import BlogAddComponent from "../../../components/admin/blog/BlogAddComponent";
import { Button, Grid } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function AdminBlogPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ BÀI VIẾT</h1>
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
            <BlogAddComponent />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button
              startIcon={<FileUploadIcon />}
              variant="contained"
              color="success"
              type="file"
            >
              Nhập Excel
            </Button>
          </Grid>
        </Grid>
        <BlogTableComponent />
      </div>
    </>
  );
}

