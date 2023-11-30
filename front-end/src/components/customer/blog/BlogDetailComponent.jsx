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

export default function BlogDetailComponent() {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);
  
    const blogs = useSelector((state) => state.blog.blogs);

    return (
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
                            <Button size="small">Chi tiết</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
