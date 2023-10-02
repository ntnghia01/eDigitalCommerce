import CustomerTopBar from "../../components/customer/CustomerTopBar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProductListComponent from "../../components/customer/product/ProductListComponent";

export default function CustomerPage () {
    return (
        <>
        <Box sx={{ flexGrow: 1, backgroundColor: '#eeeeee'}}>
            <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} sx={{backgroundColor: 'white'}} style={{paddingLeft: 0}}>
                <CustomerTopBar />
                <ProductListComponent />
            </Grid>
            <Grid item xs={2}></Grid>
            </Grid>
        </Box>
        </>
    )
}