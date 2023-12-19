import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';

export const Navbar = () => {
  const [menu, setMenu] = useState("");

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt="navlogo" />
        <p>DREAMSHOP</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("Shop") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
          {menu === "Shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("men") }}>
          <Link style={{ textDecoration: 'none' }} to='/men'>Mens</Link>
          {menu === "men" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("women") }}>
          <Link style={{ textDecoration: 'none' }} to='/women'>woamens</Link>
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("kids") }}>
          <Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/register'><button>Register</button></Link>
        <Link to='/cart'><img src={cart_icon} alt="cart icon" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};
