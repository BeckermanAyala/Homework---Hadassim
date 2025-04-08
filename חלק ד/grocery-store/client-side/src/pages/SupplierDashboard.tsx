import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { getOrdersBySupplier, updateOrderStatus } from '../services/api';
import { jwtDecode } from 'jwt-decode';
import OrderCard from '../components/OrderCard';
import { Order, DecodedToken } from '../types';
import TopBar from '../components/TopBar';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';



const SupplierDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async (supplierId: string) => {
    const data = await getOrdersBySupplier(supplierId);
    console.log('jdjjj', (supplierId))
    setOrders(data);
  };

  const handleApprove = async (_id: string) => {
    await updateOrderStatus(_id, 'בתהליך');
    const token = localStorage.getItem('token');
    if (!token) return;
    const decoded: DecodedToken = jwtDecode(token);
    fetchOrders(decoded.id);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const decoded: DecodedToken = jwtDecode(token);
    fetchOrders(decoded.id);
  }, []);

  return (

    <Box sx={{ px: 4, py: 6 }}>
      <TopBar />
      <Toolbar />
      <Typography variant="h4" align="center" mt={4} mb={4}>Supplier Orders</Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '60vh' }}
      >
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <OrderCard
              order={order}
              onAction={() => handleApprove(order._id)}
              actionLabel="Approve Order"
              showAction={order.status === 'חדש'}
            />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default SupplierDashboard;