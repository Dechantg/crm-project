import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import SupplierCreateModal from './SupplierCreateModal';


const ProductList = () => {
  const [allProducts, setAllProduct] = useState(null);
  const [thumbnails, setThumbnails] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openCreateProductModal, setOpenCreateProductModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/allproducts');
        const data = await responce.json();
        console.log("Product data from my backend", data)
        setAllProduct(data.allProducts);
        setThumbnails(data.thumbnails)
      } catch (error) {
        console.error("Error fetching product data: ', error")
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateProductModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateProductModal(false);
    setRefreshPage(prevState => !prevState);

  };

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    console.log("from the modal click product", product)
    // You may trigger modal opening logic here
  };


  return (
<div>
      <button onClick={handleCreateNew}>Create New Product</button>
      <h1>Product List</h1>
      {/* Render product list */}
      
{allProducts ? (
  <div>
    {allProducts.map(product => (
      <div key={product.id}>
        <p>Product: {product.product_name}</p>
        <p>Supplier: {product.supplier_name}</p>
        {thumbnails && thumbnails.map(image => {
          if (image.name === product.thumbnail) {
            return (
              <div key={`${product.id}-${image.id}`} onClick={() => openDetailsModal(product)}>

              <img
                key={`${product.id}-${image.id}`}
                src={`data:image/jpeg;base64,${image.data}`}
                alt={image.name}
                style={{ width: '50px', height: '50px', marginRight: '10px', cursor: 'pointer' }}
              />
              </div>
            );
          }
          return null;
        })}
        <hr />
      </div>
    ))}
  </div>
) : (
  <p>Loading...</p>
)}

      {/* Render the modal */}
      {/* {openCreateProductModal && <ProductCreateModal onClose={handleCloseModal} />} */}
    </div>
  );
};
export default ProductList;