import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Popover, Typography } from "@mui/material";

export default function CartPreviewComponent({open, anchorEl, handlePopoverClose, cart}) {
    return(
        <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6">Giỏ hàng của bạn</Typography>
                  <List>
                    {cart.map((item) => (
                      <ListItem key={item.cartDetailId}>
                        <ListItemAvatar>
                          <Avatar src={`http://localhost:9004/api/product/images/${item.product.proImage}`} alt={item.product.proName} sx={{ width: 50, height: 50, borderRadius: 1 }}/>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.product.proName}
                          secondary={`Số lượng: ${item.cartDetailQuantity}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Popover>
    )
}
