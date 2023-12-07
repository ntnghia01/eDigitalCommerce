import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
// import Icons
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import { DataGrid } from "@mui/x-data-grid";
import { fetchCategories } from "../../../slices/categorySlice";
import { useEffect } from "react";
import DataGridDemo from "../../../components/admin/Category/CategoryDataTable";
import { searchReviewByContent } from "../../../slices/reviewSlice";

// import Component

// example data

export default function FilterReviewTable() {

  const dispatch = useDispatch();

  const changeSearchData = (e) => {
    e.preventdefault;
    console.log(e.target.value);
    const searchData = { reviewContent: e.target.value };
    dispatch(searchReviewByContent(searchData));
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 2 }}
      >
        <Grid item xs={9} md={8}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
          >
            <Typography variant="h7">Lọc theo:</Typography>
            <Box sx={{ minWidth: 150 }}>
                <TextField id="outlined-basic" size="small" variant="outlined" type="date"/>
            </Box>
            <Box sx={{ minWidth: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Mức đánh giá</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            
            <Box sx={{ minWidth: 110 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Mới nhất</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box >
              <Button variant="outlined" color="grey" startIcon={<FilterAltOffIcon />} size="large">Bỏ lọc</Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={3} md={4}>
          {/* Thanh tìm kiếm */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <TextField
              id="search"
              label="Tìm kiếm"
              variant="outlined"
              size="small"
              onChange={e=>{changeSearchData(e)}}
            />
            {/* <Box sx={{ minWidth: 100 }}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Loại</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={""}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box> */}
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
