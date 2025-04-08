import { useState } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Tabs,
  Tab,
  CssBaseline,
  Grid,
  Paper
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Auth = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [productsOffered, setProductsOffered] = useState([{ name: '', price: '', minQuantity: '' }]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token, role } = await login(phoneNumber, password);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') navigate('/admin');
      else if (role === 'supplier') navigate('/supplier');
      else setError('Unknown user role');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = {
        companyName,
        phoneNumber: signupPhone,
        representativeName,
        password: signupPassword,
        role: 'supplier',
        productsOffered: productsOffered.map((p) => ({
          name: p.name,
          price: Number(p.price),
          minQuantity: Number(p.minQuantity),
        })),
      };

      await register(data);
      alert('Registration successful! Please log in.');
      setTabIndex(0);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleProductChange = (index: number, field: 'name' | 'price' | 'minQuantity', value: string) => {
    const updated = [...productsOffered];
    updated[index][field] = value;
    setProductsOffered(updated);
  };

  const handleAddProduct = () => {
    setProductsOffered([...productsOffered, { name: '', price: '', minQuantity: '' }]);
  };

  const handleRemoveProduct = (index: number) => {
    const updated = [...productsOffered];
    updated.splice(index, 1);
    setProductsOffered(updated);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 6,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#00C2FF' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Grocery Login
          </Typography>
          <Tabs value={tabIndex} onChange={handleTabChange} centered sx={{ mt: 2 }}>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {tabIndex === 0 && (
            <LoginForm
              phoneNumber={phoneNumber}
              password={password}
              error={error}
              onPhoneChange={setPhoneNumber}
              onPasswordChange={setPassword}
              onSubmit={handleLogin}
            />
          )}

          {tabIndex === 1 && (
            <SignUpForm
              companyName={companyName}
              signupPhone={signupPhone}
              representativeName={representativeName}
              signupPassword={signupPassword}
              productsOffered={productsOffered}
              error={error}
              onChange={{
                companyName: setCompanyName,
                phone: setSignupPhone,
                repName: setRepresentativeName,
                password: setSignupPassword,
                product: handleProductChange,
              }}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
              onSubmit={handleRegister}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Auth;
