import * as React from "react";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableProducts, fetchProducts } from "../../slices/productSlice";

function formatNumberWithCommas(input) {
    // Kiểm tra xem đầu vào có phải là một số nguyên không
    if (typeof input === 'number' && Number.isInteger(input)) {
        // Chuyển số nguyên thành chuỗi
        input = input.toString();
    }

    // Kiểm tra xem đầu vào có phải là một chuỗi không
    if (typeof input !== 'string') {
        return "Invalid input";
    }

    // Kiểm tra xem chuỗi có chứa chỉ chứa số không
    if (!/^\d+$/.test(input)) {
        return "Invalid input";
    }

    // Sử dụng regular expression để thêm dấu chấm sau mỗi 3 chữ số từ phải sang trái
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ProductListComponent () {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    React.useEffect(() => {
        dispatch(fetchAvailableProducts());
    }, [dispatch]);

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 4 }}>
                <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {products.map((product) => (
                        <Grid item xs={3} md={3} key={product.proId}>
                            <Card sx={{ maxWidth: '100%' }}>
                                <CardMedia
                                    sx={{ height: 200, maxWidth: 200 }}
                                    image={`http://localhost:9004/api/product/images/${product.proImage}`}
                                    title="green iguana"
                                    style={{textAlign: 'center'}}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {product.proName}
                                    </Typography>
                                    <Typography variant="body1" color="red">
                                    {formatNumberWithCommas(product.proPrice)} ₫
                                    </Typography>
                                    <Rating name="read-only" value={4} readOnly />
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Mua ngay</Button>
                                    <Button size="small"><Link to={`/product/detail/${product.proId}`} style={{textDecoration:'none'}}>Chi tiết</Link></Button>
                                    <Button variant="contained"  ><ShoppingCartIcon /></Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    
                    
                </Grid>
            </Box>
        </>
    )
}