import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import SupplierDashboard from './pages/SupplierDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/supplier" element={<SupplierDashboard />} /> {/* ✅ זה מה שהיה חסר */}


      </Routes>
    </Router>
  );
};

export default App;
