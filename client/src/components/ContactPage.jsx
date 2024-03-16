import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import ClientCreateModal from './ClientCreateModal';


const ContactList = () => {

  const [allClients, setAllClients] = useState(null);
  const [openCreateClientModal, setOpenCreateClientModal] = useState(false);

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
  }, []);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateClientModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateClientModal(false);
  };

  return (
    <div>
      <button onClick={handleCreateNew}>Create New Client</button>
      <h1>Client List</h1>
      {/* Render client list */}
      {allClients ? (
        <div>
          {allClients.map(client => (
            <div key={client.id}>
              <p>Client ID: {client.id}</p>
              <p>Client Name: {client.client_name}</p>
              {/* Add more data display as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Render the modal */}
      {openCreateClientModal && <ClientCreateModal onClose={() => setOpenCreateClientModal(false)} />}
    </div>
  );
};
export default ContactList;