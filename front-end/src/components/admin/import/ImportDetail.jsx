import * as React from "react";
import { Paper, Select, Stack, TextField } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../slices/productSlice";import { useState } from "react";
;

export default function ImportDetail( {onSave} ) {

  const dispatch = useDispatch();

  const [disableButton, setDisableButton] = React.useState(false);

  const productData = useSelector((state) => state.product.products);

  const [product, setProduct] = React.useState();
  const [importDetailQuantity, setImportDetailQuantity] = React.useState(0);
  const [importDetailPrice, setImportDetailPrice] = React.useState();

  const [isNull, setIsNull] = useState();

  React.useEffect(() => {
    dispatch(fetchProducts());

  }, [dispatch]);

  const handleSaveData = () => {
    if (!product) {
      setIsNull("product");
    } else if (importDetailQuantity == 0) {
      setIsNull("importDetailQuantity")
    } else if (importDetailPrice == 0) {
      setIsNull("importDetailPrice");
    } else {
      const importDetail = {
        product: product,
        importDetailQuantity: importDetailQuantity,
        importDetailPrice: importDetailPrice
      };
      onSave(importDetail);
      setDisableButton(true);
      console.log(importDetail);
      setIsNull();
    }

  }


  return (
    <Paper elevation={3} sx={{ margin: 1, padding: 1 }}
      >
        * Nhấn "Lưu" sau khi điền thông tin
          <FormControl fullWidth sx={{mt: 3, marginBottom: 2}}>
            <InputLabel id="demo-simple-select-label">Sản phẩm *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              fullWidth
              label="Sản phẩm"
              onChange={(e) => {
                setProduct(e.target.value);
              }}
              required
              error={isNull == 'product' ? true : false}
            >
                {productData.map((product) => (
                    <MenuItem key={product.proId} value={product.proId}>{product.proName}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2}>
            <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Số lượng"
            type="number"
            // fullWidth
            variant="standard"
            onChange={(e) => {
              setImportDetailQuantity(e.target.value);
            }}
            inputProps={{ min: 0 }}
            required
            error={isNull == 'importDetailQuantity' ? true : false}
            helperText={isNull == 'importDetailQuantity' ? "Số lượng nhập là bắt buộc" : ""}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pro_name"
            label="Giá nhập"
            type="number"
            // fullWidth
            variant="standard"
            onChange={(e) => {
              setImportDetailPrice(e.target.value);
            }}
            inputProps={{ min: 0 }}
            required
            error={isNull == 'importDetailPrice' ? true : false}
            helperText={isNull == 'importDetailPrice' ? "Giá nhập là bắt buộc" : ""}
          />
          <Button variant="contained" onClick={handleSaveData} disabled={disableButton}>Lưu</Button>
          </Stack>
          
    </Paper>
  );
}
