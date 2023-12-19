import React from 'react';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Pages/Navbar';
import { ShopCategory } from './Pages/ShopCategory';
import { Cart } from './Pages/Cart';

import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import Men from './Components/Pages/Men';
import { Login } from './Components/Pages/Login';
import { Register } from './Components/Pages/Register';
import User from './Components/Pages/User';
import Kids from './Components/Pages/Kids';
import Women from './Components/Pages/Women';
import { AdminDashboard } from './Components/Pages/AdminDashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/Men' element={<Men />} />
          <Route path='/Women' element={<Women />} />
          <Route path='/Kids' element={<Kids />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/user' element={<User />} />
          <Route path='/admin' element={<AdminDashboard />}/>
         
                 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App ;
