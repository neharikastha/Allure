import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  const navigate = useNavigate();
  return (
    <div>
    {/* <button onClick={() => navigate(-1)}>go back</button> */}
       <Nav/> 
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/products/:id' element={<ProductScreen />} />
          <Route path='/cart/:id?' element={<CartScreen />} />

          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />

          <Route path='/admin/orderlist' element={<OrderListScreen />} />
        </Routes>
      </div>
  );
}

export default App;
