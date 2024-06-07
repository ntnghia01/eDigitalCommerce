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
import MicIcon from "@mui/icons-material/Mic";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countCartDetail, fetchCartDetail } from "../../slices/cartSlice";
import { deleteCustomerInfo, getCustomerInfo } from "../../slices/customerSlice";
import { searchProductAvailable, searchProductByName } from "../../slices/productSlice";
import { getOrderCountByCustomerId } from "../../slices/orderSlice";
import { Grid, List, ListItem, ListItemText, Popover } from "@mui/material";
import CartPreviewComponent from "./cart/CartPreviewComponent";

const pages = ["Trang chủ", "Giới thiệu", "Liên hệ"];
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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[2][0]}`,
  };
}
export default function CustomerTopBar() {

  console.log("Check render");

  const { mode, setMode } = useColorScheme();
  const customerLogin = localStorage.getItem("customerName");
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
    setAnchorElUser(null);
  };

  const handleSignout = () => {
    localStorage.removeItem("customerID");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customerImage");

    dispatch(deleteCustomerInfo());
    handleCloseUserMenu();
    navigate("/");
  };

  const navigate = useNavigate();
  const navi = () => {
    navigate("/login");
  };

  const [inputValue, setInputChat] = useState("");
  const [recognition, setRecognition] = useState();
  const [isListening, setIsListening] = useState();

  const changeValueTest = (e) => {
    e.preventdefault;
    setInputChat(e.target.value);
    console.log(e.target.value);
    const searchData = { proName: e.target.value };
    dispatch(searchProductAvailable(searchData));
  };
  const products = useSelector((state) => state.product.products);

  const countCart = useSelector((state) => state.cart.countCart);
  const countOrder = useSelector((state) => state.order.orderCount);
  const cart = useSelector((state) => state.cart.cart);

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
      const searchData = { proName: transcript };
      dispatch(searchProductAvailable(searchData));
      setIsListening(false);
    };

    setRecognition(recognitionInstance);
    dispatch(fetchCartDetail(localStorage.getItem("customerID")));
    dispatch(countCartDetail(localStorage.getItem("customerID")));
    dispatch(getOrderCountByCustomerId(localStorage.getItem("customerID")));
  }, []);

  useEffect(() => {
    dispatch(fetchCartDetail(localStorage.getItem("customerID")));
    dispatch(countCartDetail(localStorage.getItem("customerID")));
    dispatch(getOrderCountByCustomerId(localStorage.getItem("customerID")));
  }, []);

  const startListening = () => {
    if (recognition)
      if (!isListening) {
        setIsListening(true);
        recognition.start();
      } else {
        setIsListening(false);
        recognition.stop();
      }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    dispatch(fetchCartDetail(localStorage.getItem("customerID")));
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
    <AppBar position="static">
      <Grid container spacing={2}>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
        <Grid
          item
          xs={8}
          sx={{ backgroundColor: "white" }}
          style={{ paddingLeft: 0 }}
        >
        <Container maxWidth="xl" sx={{backgroundColor: '#1976d2'}}>
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <img
              alt="LOGO"
              src="../../../public/logo6.png"
              style={{ cursor: "pointer", width: 120, padding: 5 }}
              onClick={() => navigate("/")}
            />
            {/* <Typography
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
              LOGOOO
            </Typography> */}

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
                onClick={() => {
                  navigate("/");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Trang chủ
              </Button>
              <Button
                key="lookup"
                onClick={() => {
                  navigate("/lookup");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Tra cứu
              </Button>
              {/* <Button
                key="intro"
                onClick={() => {
                  navigate("/");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Giới thiệu
              </Button> */}
              <Button
                key="blog"
                onClick={() => {
                  navigate("/blog");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Blog
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
                // aria-label="show 4 new cart"
                color="inherit"
                onClick={() =>
                  navigate(`/cart/${localStorage.getItem("customerID")}`)
                }
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
              >
                <Badge badgeContent={countCart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <CartPreviewComponent open={open} anchorEl={anchorEl} handlePopoverClose={handlePopoverClose} cart={cart}/>
              <IconButton
                size="large"
                // aria-label="show 4 new history"
                color="inherit"
                onClick={() =>
                  navigate(`/history/${localStorage.getItem("customerID")}`)
                }
              >
                <Badge badgeContent={countOrder} color="error">
                  <HistoryIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                // aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                // aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                // aria-label="show 17 new mode"
                color="inherit"
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                }}
              >
                {mode === "light" ? (
                  <DarkModeIcon style={{ cursor: "pointer" }} />
                ) : (
                  <LightModeIcon style={{ cursor: "pointer" }} />
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
                    {/* <Avatar
                      {...stringAvatar(
                        `${localStorage.getItem("customerName")}`
                      )}
                    /> */}
                    {/* <Avatar alt="Remy Sharp" src={`../../../public/Avar.jpg`} /> */}
                    {localStorage.getItem("customerImage") == null ? (
                      <Avatar
                        alt={localStorage.getItem("customerName")}
                        src={`../../../public/avatar.png`}
                      />) : 
                      (<Avatar
                        alt="Remy Sharp"
                        src={`http://localhost:9004/api/product/images/${localStorage.getItem("customerImage")}`}
                      />)
                    }
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
                  {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                  <MenuItem>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        navigate("/personal");
                        handleCloseUserMenu();
                      }}
                    >
                      Thông tin cá nhân
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleSignout()}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
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
        </Grid>
        <Grid item xs={2} sm={0} md={0} lg={0}></Grid>
      </Grid>
      
      </AppBar>
      
      {/* <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box> */}
    </>
  );
}
