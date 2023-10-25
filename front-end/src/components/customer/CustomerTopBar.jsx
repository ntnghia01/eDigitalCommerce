import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MicIcon from '@mui/icons-material/Mic';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countCartDetail } from "../../slices/cartSlice";
import { deleteCustomerInfo } from "../../slices/customerSlice";

const pages = ["Trang chủ", "Giới thiệu", "Liên hệ"];
const settings = ["Thông tin cá nhân", "Tài khoản", "Cài đặt", "Đăng xuất"];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
export default function CustomerTopBar() {
  const { mode, setMode } = useColorScheme();

  const customerLogin = sessionStorage.getItem("customerName");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();

  const handleCloseUserMenu = () => {
    sessionStorage.removeItem("customerID");
    sessionStorage.removeItem("customerName");
    sessionStorage.removeItem("customerToken");

    setAnchorElUser(null);
    dispatch(deleteCustomerInfo());
  };

  const navigate = useNavigate();
  const navi = () => {
    navigate("/login");
  };

  const [inputValue, setInputChat] = useState('');
  const [recognition, setRecognition] = useState();
  const [isListening, setIsListening] = useState();

  const changeValueTest = (e) => {
    e.preventdefault;
    setInputChat(e.target.value);
  }

  

  const countCart = useSelector((state) => state.cart.countCart);

  useEffect(() => {
    const SpeechRecognition = 
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Trình duyệt của bạn không hỗ trợ chuyển đổi giọng nói thành văn bản."
      );
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = "vi-VN";
 
    recognitionInstance.onresult = (event) => {
      const { transcript } = event.results[0][0];
      // console.log(event.results[0][0]);
      setInputChat(transcript);
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    
    dispatch(countCartDetail(sessionStorage.getItem("customerID")));
  },[])
  // useEffect(()=>{
  //   dispatch(countCartDetail(sessionStorage.getItem("customerID")));
  //   console.log(countCart);
  // },[countCart])
  const startListening = () => {
    if(recognition )
      if(!isListening){
        
        setIsListening(true);
        recognition.start();
      } else {
        setIsListening(false);
        recognition.stop();
      }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))} */}
              <Button
                  key="home"
                  onClick={() => {navigate('/');}}
                  sx={{ my: 2, color: "white", display: "block" }}
                  
                >
                  Trang chủ
                </Button>
            </Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Tìm kiếm..."
                inputProps={{ "aria-label": "search" }}
                value={inputValue}
                onChange={(e) => changeValueTest(e)}
              />
              {/* <Button variant="contained" color="error" onClick={() => startListening()}>
                  Mic
                </Button> */}
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => startListening()}
                color={isListening ? "error" : "inherit"}

              >
                <MicIcon />
              </IconButton>
            </Search>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new cart"
                color="inherit"
                onClick={() =>
                  navigate(`/cart/${sessionStorage.getItem("customerID")}`)
                }
              >
                <Badge badgeContent={countCart} color="error" >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new history"
                color="inherit"
              >
                <Badge badgeContent={3} color="error">
                  <HistoryIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new mode"
                color="inherit"
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <LightModeIcon
                    style={{ cursor: "pointer" }}
                  />
                )}
              </IconButton>
            </Box>
            {/* <Box sx={{ flexGrow: 1 }} /> */}
            {/* <Tooltip title="Dark mode"> */}

            {customerLogin ? (
              <Box sx={{ flexGrow: 0, marginLeft: 2 }}>
                {customerLogin}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, marginLeft: 1 }}
                  >
                    <Avatar alt="Remy Sharp" src={`../../../public/avar.jpg`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box
                style={{ cursor: "grab" }}
                sx={{ flexGrow: 0, marginLeft: 2 }}
                onClick={navi}
              >
                Đăng nhập
                <IconButton sx={{ p: 0, marginLeft: 1 }}>
                  <Avatar alt="Remy Sharp" src={`../../../public/avatar.png`} />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box> */}
    </>
  );
}
