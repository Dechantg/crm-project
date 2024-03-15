
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AddressForm from './AddressForm.jsx';
import SocialMediaForm from './SocialMediaForm.jsx';
import PhoneNumberForm from './PhoneNumberForm.jsx';
import EmailForm from './EmailForm.jsx';

const ProducerCreateModal = ({onClose}) => {
  const [file, setFile] = useState(null);
  const [producerCreationDetails, setProducerCreationDetails] = useState(null);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/producer');
        const data = await responce.json();
        console.log("data from my backend: ", data.producerDetails)

        setProducerCreationDetails(data.producerDetails);
      } catch (error) {
        console.error('Error fetching producer data: ', error);
      }
    };
    fetchData();
  }, []);



  return (


  )
}