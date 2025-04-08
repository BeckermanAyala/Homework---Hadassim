import { useState } from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions,TextField, MenuItem, Button, Box} from '@mui/material';
import { Supplier, Product } from '../types';
// Component for the new order window
interface CreateOrderProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (supplierId: string, products: Product[]) => void;
  suppliers: Supplier[];
}

const CreateOrder = ({ open, onClose, onSubmit, suppliers }: CreateOrderProps) => {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [products, setProducts] = useState<Product[]>([{ name: '', quantity: 1 }]);

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updated = [...products];
    updated[index] = {
      ...updated[index],
      [field]: field === 'quantity' ? Number(value) : value,
    };
    setProducts(updated);
  };

  const handleAddProduct = () => setProducts([...products, { name: '', quantity: 1 }]);

  const handleSubmit = () => {
    onSubmit(selectedSupplier, products);
    setSelectedSupplier('');
    setProducts([{ name: '', quantity: 1 }]);
    onClose();
  };

  const selectedSupplierObj = suppliers.find((s) => s._id === selectedSupplier);
  const availableProducts = selectedSupplierObj?.productsOffered || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Order</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          select
          label="Select Supplier"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          fullWidth
          required
        >
          {suppliers.map((s) => (
            <MenuItem key={s._id} value={s._id}>
              {s.companyName}
            </MenuItem>
          ))}
        </TextField>
        {products.map((product, index) => (
          <Box key={index} display="flex" gap={2}>
            <TextField
              select
              label="Product"
              value={product.name}
              onChange={(e) => handleProductChange(index, 'name', e.target.value)}
              fullWidth
            >
              {availableProducts.map((p, idx) => (
                <MenuItem key={idx} value={p.name}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Quantity"
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
              sx={{ width: '120px' }}
            />
          </Box>
        ))}
        <Button variant="outlined" onClick={handleAddProduct}>
          + Add Product
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrder;