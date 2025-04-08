import { Box, Button, TextField, Typography } from '@mui/material';
// Login component
interface Props {
  phoneNumber: string;
  password: string;
  error: string;
  onPhoneChange: (val: string) => void;
  onPasswordChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({ phoneNumber, password, error, onPhoneChange, onPasswordChange, onSubmit }: Props) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => onPhoneChange(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="password"
        label="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: '#00C2FF',
          '&:hover': { backgroundColor: '#00A9E0' },
        }}
      >
        Login
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default LoginForm;
