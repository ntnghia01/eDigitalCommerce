import { emphasize, styled } from "@mui/material/styles";

import Chip from "@mui/material/Chip";

import InputBase from "@mui/material/InputBase";

import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      "&:hover, &:focus": {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      "&:active": {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

export  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  
export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

  export const formatDateTime = (oriDateTime) => {
    const dateTime = new Date(oriDateTime);
    const date = dateTime.getDate();
    const month = dateTime.getMonth() + 1;
    const year = dateTime.getFullYear();
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();
  
    const newDateTime = `${date < 10 ? "0" : ""}${date}-${
      month < 10 ? "0" : ""
    }${month}-${year} ${hour < 10 ? "0" : ""}${hour}:${
      minute < 10 ? "0" : ""
    }${minute}:${second < 10 ? "0" : ""}${second}`;
    return newDateTime;
  };

  export function formatNumberWithCommas(input) {
    if (typeof input === "number" && Number.isInteger(input))
      input = input.toString();
    if (typeof input !== "string") return "Invalid input";
    if (!/^\d+$/.test(input)) return "Invalid input";
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

export const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function formatCurrency(number) {
  const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
  });
  return formatter.format(number);
}

export const convertMillisecondsToDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Định dạng ngày và tháng để đảm bảo có hai chữ số
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Trả về chuỗi ngày/tháng/năm
  return `${formattedDay}-${formattedMonth}-${year}`;
}

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};