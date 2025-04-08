import { Paper, Typography, Box, Chip, Button } from '@mui/material';
import { Order } from '../types';
// Component for order card
interface OrderCardProps {
  order: Order;
  onAction?: () => void;
  actionLabel?: string;
  showAction?: boolean;
}

const OrderCard = ({ order, onAction, actionLabel, showAction = false }: OrderCardProps) => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 4,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      background: '#fefefe',
      transition: '0.3s',
      '&:hover': {
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
      },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <Box>
      <Typography variant="h6" fontWeight={700} color="primary">
        Order ID: {order.orderId}
      </Typography>

      <Box mb={1}>
        {order.products.map((product, idx) => (
          <Typography key={idx} sx={{ ml: 1 }}>
            ▸ <strong>{product.name}</strong> – {product.quantity} units
          </Typography>

        ))}
        <Typography variant="body2" color="text.secondary" mt={1}>
          Supplier: <strong>{order.supplierId?.companyName}</strong>
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Created on: {new Date(order.createdAt).toLocaleDateString()}
        </Typography>

      </Box>
      <Chip
        label={`Status: ${order.status}`}
        color={
          order.status === 'חדש'
            ? 'default'
            : order.status === 'בתהליך'
              ? 'warning'
              : 'success'
        }
        sx={{ fontWeight: 500 }}
      />
    </Box>
    {showAction && (
      <Box mt={2} textAlign="right">
        <Button
          variant="contained"
          onClick={onAction}
          sx={{ borderRadius: 2, px: 3, py: 1 }}
        >
          {actionLabel}
        </Button>
      </Box>
    )}
  </Paper>
);

export default OrderCard;