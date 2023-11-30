import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý dữ liệu form tại đây, ví dụ: gửi dữ liệu qua API hoặc xử lý logic khác
        console.log(formData);
    };

    return (
        <Grid container sx={{padding: 5}} spacing={5}>
            <Grid item xs={12} md={6}>
                <h2>Liên Hệ</h2>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Họ và Tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Tiêu Đề"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nội Dung"
                                name="message"
                                multiline
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" type="submit">
                                Gửi
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12} md={6}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
                />
            </GoogleMapReact>
            </Grid>
        </Grid>
    );
}
