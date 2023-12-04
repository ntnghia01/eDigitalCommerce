import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import DeleteCategory from "../../../components/admin/Category/ConfirmDeleteCategory";
import CategoryEditForm from "../../../components/admin/Category/CategoryEditForm";
import { fetchCategories } from "../../../slices/categorySlice";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Stack } from '@mui/material';


const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'cateName',
      headerName: 'Tên danh mục',
      width: 150,
      editable: true,
    },
    {
      field: 'cateDesc',
      headerName: 'Mô tả',
      width: 150,
      editable: true,
    },
    {
      field: 'cateStatus',
      headerName: 'Trạng thái',
      type: 'number',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'actions',
    //   headerName: 'Thao tác',
    //   width: 110,
    //   renderCell: (params) => {
    //     return (
    //     <Stack direction="row" spacing={2}>
    //         <CategoryEditForm data={{id: category.cateId, name: category.cateName, desc: category.cateDesc, status: category.cateStatus}}/>
    //         <DeleteCategory deleteID={category.cateId}/>
    //       </Stack>
    //     );
    //   },
    // },
  ];


export default function DataGridDemo() {
    const dispatch = useDispatch();
    const categories = useSelector((state) =>
    state.categories.categories.map((category) => ({
    id: category.cateId, // Đảm bảo rằng thuộc tính id phù hợp với id của mỗi danh mục
    cateName: category.cateName,
    cateDesc: category.cateDesc,
    cateStatus: category.cateStatus
  }))
);
    const isLoading = useSelector((state) => state.categories.isLoading);
    const error = useSelector((state) => state.categories.error);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={categories}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
