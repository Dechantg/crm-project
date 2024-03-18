

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'


const ProductCreateModal = ({ onClose }) => {
  const [modalCreationDetails, setModalCreationDetails] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [producers, setProducers] = useState(null);
  const [allAlch, setAllAlch] = useState(null);
  const [allNonAlch, setAllNonAlch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/contact');
        const data = await responce.json();
        console.log("data from my backend: ", data);
        setAllAlch(data.allAlch);
        setAllNonAlch(data.setAllNonAlch);
        setProducers(data.producers);
      } catch (error) {
        console.error('Error fetching contact data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      for (const key in formValues) {
        if (Object.prototype.hasOwnProperty.call(formValues, key)) {
          formData.set(key, formValues[key]);
        }
      }

      const response = await fetch('/api/frontend/test', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Create Contact Modal"
    >
      <div>
        <div>
          <button onClick={onClose}>Close</button>
          <h1>New Product</h1>
        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label></label>
            <br></br>
            <br></br>
            <button type='submit'>Create Product</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProductCreateModal;
