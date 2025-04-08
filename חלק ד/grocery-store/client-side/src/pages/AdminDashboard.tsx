import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import { getAllOrders, getSuppliers, createOrder, updateOrderStatus } from '../services/api';
import OrderCard from '../components/OrderCard';
import CreateOrderDialog from '../components/CreateOrder';
import { Order, Supplier, Product,DecodedToken } from '../types';
import TopBar from '../components/TopBar';
import InboxIcon from '@mui/icons-material/Inbox';
import {Grid} from '@mui/material';
import { jwtDecode } from 'jwt-decode';



const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const fetchOrders = async () => {
    const data = await getAllOrders();
  
    let filtered: Order[] = data;
  
    if (statusFilter) {
      filtered = data.filter((o: Order) => o.status === statusFilter);
    } else if (!showAllOrders) {
      filtered = data.filter((o: Order) => o.status === 'בתהליך');
    }
  
    setOrders(filtered);
  };

  const fetchSuppliers = async () => {
    const data = await getSuppliers();
    setSuppliers(data);
  };

  const handleComplete = async (orderId: string) => {
    await updateOrderStatus(orderId, 'הושלמה');
    fetchOrders();
  };

  const handleCreateOrder = async (supplierId: string, products: Product[]) => {
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token!);
    const storeOwnerId = decoded.id;
  
    await createOrder({ supplierId, products, storeOwnerId });
    fetchOrders();
  };
  useEffect(() => {
    fetchOrders();
    fetchSuppliers();
  }, [showAllOrders, statusFilter]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
  variant="permanent"
  sx={{
    width: 200,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: { width: 200, boxSizing: 'border-box' },
  }}
>
  <Toolbar />
  <Box sx={{ overflow: 'auto', mt: 5 }}>
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={() => setOpenDialog(true)}>
          <AddIcon sx={{ mr: 1 }} />
          <ListItemText primary="Create Order" />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
      <ListItemButton onClick={() => {
  setShowAllOrders(!showAllOrders);
  setStatusFilter(null); 
}}>
  <InboxIcon sx={{ mr: 1 }} />
  <ListItemText primary={showAllOrders ? 'Show In-Progress' : 'Show All'} />
</ListItemButton>
      </ListItem>

      <ListItem>
  <FilterListIcon sx={{ mr: 1 }} />
  <ListItemText primary="Filter by Status" />
</ListItem>

      {['חדש', 'בתהליך', 'הושלמה'].map((status) => (
        <ListItem key={status} disablePadding>
          <ListItemButton
            selected={statusFilter === status}
            onClick={() => setStatusFilter(statusFilter === status ? null : status)}
          >
            <ListItemText primary={status} sx={{ pl: 2 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
</Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <TopBar />


        <Toolbar />

        <Typography variant="h5" mb={3}>
          {showAllOrders ? 'All Orders' : 'In-Progress Orders'}
        </Typography>

        {orders.length === 0 ? (
  <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
    <Typography variant="h6" color="text.secondary">
      אין הזמנות בתהליך
    </Typography>
  </Box>
) : (
          <Grid container spacing={3}>
            {orders.map((order) => (
              <Grid item={true} xs={12} sm={6} md={4} key={order._id}>
                <OrderCard
                  order={order}
                  onAction={() => handleComplete(order._id)}
                  actionLabel="Confirm Received"
                  showAction={order.status === 'בתהליך'}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <CreateOrderDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onSubmit={handleCreateOrder}
          suppliers={suppliers}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;