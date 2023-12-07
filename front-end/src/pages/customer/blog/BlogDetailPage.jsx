import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchBlogAvailable, fetchBlogs, getBlogByID } from '../../../slices/blogSlice';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

export default function BlogDetailPage() {
    const {blogId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getBlogByID(blogId));
    }, [dispatch]);
  
    const blog = useSelector((state) => state.blog.blog);

    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
      setSearchText(event.target.value);
      // Điều chỉnh logic tìm kiếm dựa trên searchText ở đây
      // Ví dụ: lọc danh sách sản phẩm theo searchText
    };

    console.log(blog);

    return (
        <>
        <Breadcrumbs aria-label="breadcrumb" sx={{margin: 3}}>
            <StyledBreadcrumb
            component="a"
            // href="#"
            onClick={() => {navigate('/');}}
            label="Trang chủ"
            icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb 
            label="Blog"
            component="a" 
            icon={<ArticleIcon fontSize="small" />}  />
        </Breadcrumbs>

        <Stack spacing={3} sx={{padding: 3}}>

        {blog && ( // Kiểm tra nếu blog đã có dữ liệu
        <>
          <Typography variant='h3'>{blog.blogTitle}</Typography>
          <img src={`http://localhost:9004/api/product/images/${blog.blogImage}`} alt="" />
          <Typography variant='body1'>{blog.blogContent}</Typography>
        </>
      )}

        </Stack>


        </>
    );
}
