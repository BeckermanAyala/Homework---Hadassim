import {Box,Button,IconButton,TextField,Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// Component for registering a new supplier
interface Product {
    name: string;
    price: string;
    minQuantity: string;
}

interface Props {
    companyName: string;
    signupPhone: string;
    representativeName: string;
    signupPassword: string;
    productsOffered: Product[];
    error: string;
    onChange: {
        companyName: (val: string) => void;
        phone: (val: string) => void;
        repName: (val: string) => void;
        password: (val: string) => void;
        product: (index: number, field: keyof Product, value: string) => void;
    };
    onAddProduct: () => void;
    onRemoveProduct: (index: number) => void;
    onSubmit: (e: React.FormEvent) => void;
}

const SignUpForm = ({
    companyName,
    signupPhone,
    representativeName,
    signupPassword,
    productsOffered,
    error,
    onChange,
    onAddProduct,
    onRemoveProduct,
    onSubmit
}: Props) => {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 3, width: '100%' }}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>
                <TextField
                    required
                    fullWidth
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => onChange.companyName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    value={signupPhone}
                    onChange={(e) => onChange.phone(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="Representative Name"
                    value={representativeName}
                    onChange={(e) => onChange.repName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => onChange.password(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Products Offered:
                </Typography>

                {productsOffered.map((product, index) => (
                    <Box key={index} display="flex" gap={2} alignItems="center" mt={1}>
                        <TextField
                            label="Product Name"
                            value={product.name}
                            onChange={(e) => onChange.product(index, 'name', e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Price"
                            type="number"
                            value={product.price}
                            onChange={(e) => onChange.product(index, 'price', e.target.value)}
                            required
                            sx={{ width: 120 }}
                        />
                        <TextField
                            label="Min Qty"
                            type="number"
                            value={product.minQuantity}
                            onChange={(e) =>
                                onChange.product(index, 'minQuantity', e.target.value)
                            }
                            required
                            sx={{ width: 120 }}
                        />
                        <IconButton
                            onClick={() => onRemoveProduct(index)}
                            disabled={productsOffered.length === 1}
                            sx={{ color: 'black' }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}

                <Button onClick={onAddProduct} sx={{ mt: 2 }}>
                    + Add Product
                </Button>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: '#00C2FF',
                        '&:hover': { backgroundColor: '#00A9E0' },
                    }}
                >
                    Sign Up
                </Button>
                {error && (
                    <Typography color="error" mt={2}>
                        {error}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SignUpForm;
