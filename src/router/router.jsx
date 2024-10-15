import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import AdminDashboard from '../pages/Admin/AdminDashboard/AdminDashboard';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route 
            path="/admin/dashboard" 
            element={<PrivateRoute element={<AdminDashboard />} />} 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
