import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';


export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    title: '',
    quantity: 0,
    brand: '',
    category: '',
  });

  useEffect(() => {
    // Fetch the list of users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/get-users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddProduct = (userId) => {
    // Ouvrir la modal
    setIsModalOpen(true);
    // Réinitialiser les détails du produit
    setProductDetails({
      title: '',
      quantity: 0,
      brand: '',
      category: '',
    });
  };

  const closeModal = () => {
    // Fermer la modal
    setIsModalOpen(false);
  };

  const addProduct = async () => {
    try {
      // TODO: Ajouter la logique pour ajouter le produit avec les détails stockés dans productDetails
      // ...

      setSuccessMessage('Product added successfully');
      setErrorMessage('');
      // Fermer la modal après l'ajout du produit
      closeModal();
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error adding product');
      setSuccessMessage('');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{`${user.firstname} ${user.lastname}`}</td>
              <td>{user.email}</td>
              <td>
                <button className="add-product-btn" onClick={() => handleAddProduct(user._id)}>Add Product</button>
              </td>
              <td>
                <button className="delete-user-btn" onClick={() => handleAddProduct(user._id)}>Delete User</button>
              </td>
              <td>
                <button className="block-user-btn" onClick={() => handleAddProduct(user._id)}>Block User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Add Product</h2>
            <input
              type="text"
              placeholder="Title"
              value={productDetails.title}
              onChange={(e) => setProductDetails({ ...productDetails, title: e.target.value })}
            />
            {/* Ajoutez les autres champs nécessaires pour les caractéristiques du produit */}
            <button onClick={addProduct}>Add Product</button>
          </div>
        </div>
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};
