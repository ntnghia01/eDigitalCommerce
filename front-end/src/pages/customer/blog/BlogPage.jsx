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
import { fetchBlogs } from '../../../slices/blogSlice';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import ArticleIcon from '@mui/icons-material/Article';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from "@mui/icons-material/Search";
import { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';

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

export default function BlogPage() {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);
  
    const blogs = useSelector((state) => state.blog.blogs);

    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
      setSearchText(event.target.value);
      // Điều chỉnh logic tìm kiếm dựa trên searchText ở đây
      // Ví dụ: lọc danh sách sản phẩm theo searchText
    };

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
        <Grid container alignItems="center" justifyContent="space-between" sx={{paddingLeft: 3}}>
        <Grid item>
        <h3>Lịch sử mua hàng</h3>
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={2}> {/* Điều chỉnh kích thước cho phù hợp */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <TextField
              id="search"
              label="Tìm kiếm"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              size="small"
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
        <Grid container spacing={2} sx={{padding: 3}}>
            {blogs.map((blog) => (
                <Grid item key={blog.blogId} xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={`http://localhost:9004/api/product/images/${blog.blogImage}`}
                            title={blog.blogTitle}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {blog.blogTitle.slice(0,50)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {blog.blogContent.slice(0,100)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" startIcon={<RemoveRedEyeIcon />}>Xem chi tiết</Button>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid></>
    );
}
