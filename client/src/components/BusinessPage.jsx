import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import BusinessCreateModal from './BusinessCreateModal';


const BusinessList = () => {
  const [allBusiness, setAllBusiness] = useState(null);
  const [thumbnails, setThumbnails] = useState(null);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [allEntityClass, setAllEntityClass] = useState(null);

  const [openCreateBusinessModal, setOpenCreateBusinessModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/allbusiness');
        const data = await responce.json();
        console.log("vusiness data from my backend", data)
        setAllBusiness(data.allBusiness);
        setThumbnails(data.thumbnails);
        setAllEntityClass(data.allEntityClass)
      } catch (error) {
        console.error("Error fetching business data: ', error")
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateBusinessModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateBusinessModal(false);
    setRefreshPage(prevState => !prevState);

  };

  const openDetailsModal = (business) => {
    setSelectedBusiness(business);
    console.log("from the modal click business", business)
    // You may trigger modal opening logic here
  };


  return (
<div>
      <button onClick={handleCreateNew}>Create New Business</button>
      <h1>Business List</h1>
      {/* Render Business list */}
      
{allBusiness ? (
  <div>
    {allBusiness.map(business => (
      <div key={business.id}>
        <p onClick={() => openDetailsModal(business)}>Business: {business.business_name}</p>
        {thumbnails && thumbnails.map(image => {
          if (image.name === business.thumbnail) {
            return (
              <div key={`${business.id}-${image.id}`} onClick={() => openDetailsModal(business)}>

              <img
                key={`${business.id}-${image.id}`}
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
      {openCreateBusinessModal && <BusinessCreateModal onClose={handleCloseModal} />}
    </div>
  );
};
export default BusinessList;