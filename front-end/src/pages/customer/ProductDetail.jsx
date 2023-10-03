import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { getProductDetail } from "../../slices/productSlice";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, CardMedia, Stack } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import PaymentIcon from '@mui/icons-material/Payment';
import Rating from '@mui/material/Rating';

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

export default function ProductDetail () {

    const dispatch = useDispatch();

    const {proId} = useParams();
    const product = useSelector((state) => state.product.product);

    
    useEffect(() => {
        console.log(proId);
        dispatch(getProductDetail(proId))
            .then(() => {
                // console.log(product);
            });
    }, [dispatch])
    

    return (
        <>
        <Breadcrumbs aria-label="breadcrumb" sx={{margin: 3}}>
            <StyledBreadcrumb
            component="a"
            href="/"
            label="Trang chủ"
            icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label={product.proName} />
        </Breadcrumbs>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}  sx={{padding: 6}}>
                <Grid item xs={6}>
                    {/* <img src={`http://localhost:9004/api/product/images/${product.proImage}`}  alt="" /> */}
                    <CardMedia
                        sx={{ height: '30rem', maxWidth: '30rem' }}
                        image={`http://localhost:9004/api/product/images/${product.proImage}`}
                        title="green iguana"
                        style={{textAlign: 'center'}}
                    />
                </Grid>
                <Grid item xs={6}>
                <Stack spacing={2}>
                    <Typography variant="h3" gutterBottom>{product.proName}</Typography>
                    <Typography variant="h4" gutterBottom color={'red'}>{formatNumberWithCommas(product.proPrice)} VNĐ</Typography>
                    <Typography variant="h5" gutterBottom>Số lượng còn lại: {product.proQuantity}</Typography>
                    <Rating name="read-only" value={4} readOnly />
                    <Typography variant="h5" gutterBottom>Mô tả: {product.proDesc}</Typography>
                    <Button variant="outlined" startIcon={<PaymentIcon />}>Mua ngay</Button>
                    <Button variant="outlined" startIcon={<PaymentIcon />}>Thêm vào giỏ hàng</Button>
                </Stack>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}