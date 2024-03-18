import React, { useState, useEffect } from 'react';
import ImageView from './ImageViewer';
import '../views/Document.scss'

import ContactCreateModal from './ContactCreateModal';


const ContactList = () => {

  const [allContact, setAllContact] = useState(null);
  const [openCreateContactModal, setOpenCreateContactModal] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/get/allcontact');
        const data = await responce.json();
        console.log("Contact data from my backend: ", data)

        setAllContact(data.allContact);
      } catch (error) {
        console.error('Error fetching Contact data: ', error);
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleCreateNew = () => {
    console.log("modal button clicking")
    setOpenCreateContactModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateContactModal(false);
    setRefreshPage(prevState => !prevState);

  };

  return (
    <div>
      <button onClick={handleCreateNew}>Create New Contact</button>
      <h1>Contact List</h1>
      {/* Render contact list */}
      {allContact ? (
        <div>
          {allContact.map(contact => (
            <div key={contact.contact_id}>
              <p>Contact ID: {contact.contact_id}</p>
              <p>Contact Name: {contact.first_name} {contact.last_name}</p>
              <p> Contact Role: {contact.entity_type} </p>

              {/* Add more data display as needed */}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Render the modal */}
      {openCreateContactModal && <ContactCreateModal onClose={handleCloseModal} />}
    </div>
  );
};
export default ContactList;