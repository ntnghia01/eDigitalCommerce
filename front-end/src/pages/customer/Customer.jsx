import CustomerTopBar from "../../components/customer/CustomerTopBar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductListComponent from "./ProductListComponent";
import ProductDetail from "./ProductDetail";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import CustomerLoginPage from "./login";
import CustomerSignupPage from "./signup";
import Cart from "./cart";

export default function CustomerPage () {
    return (
        <>
        <Box sx={{ flexGrow: 1, backgroundColor: '#eeeeee'}}>
            <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} sx={{backgroundColor: 'white'}} style={{paddingLeft: 0}}>

                <CustomerTopBar />

                <Routes>
                    <Route path="/" element={<ProductListComponent />} />
                    <Route path='/login' element={<CustomerLoginPage />}></Route>
                    <Route path='/signup' element={<CustomerSignupPage />}></Route>
                    <Route path="/product/detail/:proId" element={<ProductDetail />} />
                    <Route path="/cart/:customerId" element={<Cart />}></Route>
                </Routes>
                
            </Grid>
            <Grid item xs={2}></Grid>
            </Grid>
        </Box>
        </>
    )
}