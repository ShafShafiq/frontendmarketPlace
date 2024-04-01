import logo from './logo.svg';
import './App.css';
import './index.css';
import SellerLogin from './pages/sellerLogin';
import SellerSignup from './pages/sellerSignup';
import CustomerLogin from './pages/customerLogin';
import CustomerSignup from './pages/CustomerSignup';
import SellerHome from './pages/seller-home';
import ItemsPage from './pages/Home-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    
    <Router>
    <Routes>
      {/* <Route path="/sellerLogin" element={<SellerLogin />} />
      <Route path="/Sellersignup" element={<SellerSignup />} /> */}
      <Route path="/" element={<CustomerLogin />} />
      <Route path="/Customersignup" element={<CustomerSignup />} />
      <Route path="/seller-home" element={<SellerHome />} />
      <Route path="/HomePage" element={< ItemsPage/>} />
      {/* <Route path="/seller/dashboard" element={<SellerDashboard />} />
      <Route path="/seller/add-item" element={<AddItemPage />} />
      <Route path="/seller/view-items" element={<ViewItemsPage />} />
      <Route path="/items" element={<CustomerItemsPage />} /> */}
  
    </Routes>
  </Router>
  );
}

export default App;
