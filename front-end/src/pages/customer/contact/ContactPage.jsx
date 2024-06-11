import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import GoogleMapReact from "google-map-react";
import SendIcon from "@mui/icons-material/Send";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../../slices/contactSlice";
import { Snackbar } from "@mui/material";
import { Alert } from "../../../components/customize/CustomizeComponent";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    contactUsername: "",
    contactUseremail: "",
    contactUserphone: "",
    contactTitle: "",
    contactContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form tại đây, ví dụ: gửi dữ liệu qua API hoặc xử lý logic khác
    console.log(formData);
    dispatch(addContact(formData))
      .then(() => {
        handleOpenSnackbar();
        setFormData({
          contactUsername: "",
          contactUseremail: "",
          contactUserphone: "",
          contactTitle: "",
          contactContent: "",
        })
      });
    
  };

  return (<>
          <Breadcrumbs aria-label="breadcrumb" sx={{marginLeft: 3}}>
            <StyledBreadcrumb
            component="a"
            // href="#"
            onClick={() => {navigate('/');}}
            label="Trang chủ"
            icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb 
            label="Liên hệ"
            component="a" 
            icon={<ContactMailIcon fontSize="small" />}  />
        </Breadcrumbs>
    <Grid container sx={{ padding: 5 }} spacing={5}>
      <Grid item xs={12} md={6}>
        <h2>Liên Hệ</h2>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Họ và Tên"
                name="contactUsername"
                value={formData.contactUsername}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Số điện thoại"
                name="contactUserphone"
                value={formData.contactUserphone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="contactUseremail"
                type="email"
                value={formData.contactUseremail}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tiêu Đề"
                name="contactTitle"
                value={formData.contactTitle}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nội Dung"
                name="contactContent"
                multiline
                rows={4}
                value={formData.contactContent}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" startIcon={<SendIcon />}>
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
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </Grid>
    </Grid>
    <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", color: "white" }}
        >
         Gửi liên hệ thành công!
        </Alert>
      </Snackbar>
    
    </>
  );
}
