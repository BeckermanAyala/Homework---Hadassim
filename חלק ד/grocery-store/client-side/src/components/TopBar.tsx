import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import LogoutButton from './LogoutButton';
// Component for designing the top card
const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: '#fff', height: 90, justifyContent: 'center', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
        <img src="/vite.png" alt="Logo" style={{ height: 60, position: 'absolute', left: 16 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: 'primary.main' }}>
          Grocery Store Orders
        </Typography>
        <Box sx={{ position: 'absolute', right: 16 }}>
          <LogoutButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
