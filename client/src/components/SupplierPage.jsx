import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import SupplierCreateModal from './SupplierCreateModal';


const SupplierList = () => {
  const [allSupplier, setAllSupplier] = useState(null);
  const [openCreateSupplierModal, setOpenCreateSupplierModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/allsupplier');
        const data = await responce.json();
        console.log("supplier data from my backend", data)
        setAllSupplier(data.allSupplier);
      } catch (error) {
        console.error("Error fetching supplier data: ', error")
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateSupplierModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateSupplierModal(false);
    setRefreshPage(prevState => !prevState);

  };




  return (
<div>
      <button onClick={handleCreateNew}>Create New Supplier</button>
      <h1>Supplier List</h1>
      {/* Render supplier list */}
      {allSupplier ? (
        <div>
          {allSupplier.map(supplier => (
            <div key={supplier.id}>
              <p>Supplier ID: {supplier.id}</p>
              <p>Supplier Name: {supplier.supplier_name}</p>
              {/* Add more data display as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Render the modal */}
      {openCreateSupplierModal && <SupplierCreateModal onClose={handleCloseModal} />}
    </div>
  );
};
export default SupplierList;