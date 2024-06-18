import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Icons

import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { DataGrid } from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteCategory from "../../../components/admin/Category/ConfirmDeleteCategory";
import CategoryEditForm from "../../../components/admin/Category/CategoryEditForm";
import CategoryAddForm from "../../../components/admin/Category/CategoryAddForm";
import CategoryTable from "../../../components/admin/Category/CategoryTable";
import ReviewTableComponent from "../../../components/admin/review/ReviewTableComponent";
import CommentTableComponent from "../../../components/admin/comment/CommentTableComponent";
import FilterCommentTable from "../../../components/admin/comment/FilterCommentTable";


export default function CommentPage() {
  return (
    <>
      <h1 style={{textAlign: 'center'}}>QUẢN LÝ BÌNH LUẬN</h1>
      <div style={{ height: 400, width: "100%" }}>
        <FilterCommentTable />
        <CommentTableComponent />
      </div>
    </>
  );
}

