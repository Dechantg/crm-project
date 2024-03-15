import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'


const ProducerList = () => {
  const [allProducer, setAllProducer] = useState(null);
  const [openCreateProducerModal, setOpenProducerModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/producers');
        const data = await responce.json();
        console.log("producer data from my backend", data)
        setAllProducer(data.queryResult);
      } catch (error) {
        console.error("Error fetching producer data: ', error")
      }
    };
    fetchData();
  }, []);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenProducerModal(true);
  };

  const handleCloseModal = () => {
    setOpenProducerModal(false);
  };




  return (
<div>
      <button onClick={handleCreateNew}>Create New Producer</button>
      <h1>Producer List</h1>
      {/* Render producer list */}
      {queryResult ? (
        <div>
          {queryResult.map(producer => (
            <div key={producer.id}>
              <p>Producer ID: {producer.id}</p>
              <p>Producer Name: {producer.producer_name}</p>
              {/* Add more data display as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Render the modal */}
      {openCreateProducerModal && <ProducerCreateModal onClose={() => setOpenProducerModal(false)} />}
    </div>
  );
};
export default ProducerList;