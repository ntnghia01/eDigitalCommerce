import * as React from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { shipperLogin } from '../../slices/shipperSlice';

export default function ShipperLoginPage() {
    console.log("Check render");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Xử lý logic đăng nhập ở đây (ví dụ: gọi API, kiểm tra thông tin đăng nhập, ...)
        console.log('Đăng nhập với Username:', username, 'và Password:', password);
        const loginData = {
            username: username,
            password: password
        }
        console.log(loginData);
        dispatch(shipperLogin(loginData))
            .then(() => {
                if (localStorage.getItem("shipperID")) {
                    navigate('/shipper');
                    // dispatch(countCartDetail(localStorage.getItem("customerID")));
                    // dispatch(getOrderCountByCustomerId(localStorage.getItem("customerID")));
                    // dispatch(getCustomerInfo(localStorage.getItem("customerID")));
                } else {
                    alert("Sai tài khoản hoặc mật khẩu")
                }
                console.log("Đăng nhập thành công");
            })
    };

    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
      }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={6} md={4}>
                <Paper elevation={3} style={{ padding: 20 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Đăng nhập Shipper
                    </Typography>
                    {/* <form onSubmit={handleLogin}> */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Tên đăng nhập"
                                    variant="outlined"
                                    value={username}
                                    autoComplete="current-username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    autoComplete="current-password"
                                    onKeyUp={handleEnterKeyPress}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLogin}
                                >
                                    Đăng nhập
                                </Button>
                            </Grid>
                        </Grid>
                    {/* </form> */}
                </Paper>
            </Grid>
        </Grid>
    );
}
