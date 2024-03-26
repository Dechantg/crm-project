import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import BusinessCreateModal from './BusinessCreateModal';


const BusinessList = () => {

  const [allClients, setAllClients] = useState(null);
  const [openCreateClientModal, setOpenCreateClientModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/allclient');
        const data = await responce.json();
        console.log("client data from my backend: ", data)

        setAllClients(data.allClients);
      } catch (error) {
        console.error('Error fetching client data: ', error);
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateClientModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateClientModal(false);
    setRefreshPage(prevState => !prevState);
  };

  const openDetailsModal = (client) => {
    setSelectedClient(client);
    console.log("from the modal click client", client)
    // You may trigger modal opening logic here
  };

  return (
    <div>
      <button onClick={handleCreateNew}>Create New Business Record</button>
      <h1>Client List</h1>
      {/* Render client list */}
      {allClients ? (
        <div>
          {allClients.map(client => (
            <div key={client.id}>
              <p onClick={() => openDetailsModal(client)}>Client Name: {client.client_name}</p>
              {/* Add more data display as needed */}
              <hr/>

            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Render the modal */}
      {openCreateClientModal && <ClientCreateModal onClose={handleCloseModal} />}
    </div>
  );
};
export default BusinessList;