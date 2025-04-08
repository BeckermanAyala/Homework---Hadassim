import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
// Logout button and token deletion
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (

    <Button
    component="label"
    role={undefined}
    variant="contained"
    onClick={handleLogout}
    tabIndex={-1}
    startIcon={<LogoutIcon />}
  >
Logout    
  </Button>
  );
};

export default LogoutButton;