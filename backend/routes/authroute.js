// authroute.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createUser, loginUser, checkLogin, getallUsers, getoneUser, deleteaUser, updateaUser, blockUser, unblockUser, handleRefreshToken, logout } = require('../controllers/Userctrl');
const { auth, isAdmin } = require('../middlewares/auth');
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require('../controllers/Productctrl');
router.post('/checkLogin',checkLogin);

router.post('/register', createUser);
router.post('/login', loginUser);

router.get('/get-users', getallUsers);
router.get('/get/:id', auth, getoneUser);
router.get('/refresh', handleRefreshToken);
router.get('/logout', auth, logout);
router.delete('/:id', auth, deleteaUser);
router.put('/edit-user', auth, updateaUser);
router.put('/block-user/:id', auth, isAdmin, blockUser);
router.put('/unblock-user/:id', auth, isAdmin, unblockUser);

// Add Product routes
router.post('/create-product', createProduct);
router.get('/get-product/:id', auth, getaProduct);
router.get('/get-all-products', auth, getAllProduct);
router.put('/update-product/:id', auth, updateProduct);
router.delete('/delete-product/:id', auth, deleteProduct);
router.post('/add-to-wishlist', auth, addToWishlist);
router.post('/rate-product', auth, rating);

module.exports = router;
