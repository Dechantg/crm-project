
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AddressForm from './AddressForm.jsx';
import SocialMediaForm from './SocialMediaForm.jsx';
import PhoneNumberForm from './PhoneNumberForm.jsx';
import EmailForm from './EmailForm.jsx';

const SupplierCreateModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [modalCreationDetails, setModalCreationDetails] = useState(null);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/supplier');
        const data = await responce.json();
        console.log("data from my backend: ", data.creationDetails)

        setModalCreationDetails(data.creationDetails);
      } catch (error) {
        console.error('Error fetching client data: ', error);
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
  }

  const handleClientTypeChange = (event) => {
    const selectedClientType = event.target.value;
    setFormValues({
        ...formValues,
        clientType: selectedClientType,
    });
};

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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

       

        const phoneNumberRowsString = JSON.stringify(formValues.phoneNumberRows);
        formData.set('phoneNumberRows', phoneNumberRowsString);

        const socialMediaRowsString = JSON.stringify(formValues.socialMediaRows);
        formData.set('socialMediaRows', socialMediaRowsString);

        const emailRowsString = JSON.stringify(formValues.emailRows);
        formData.set('emailRows', emailRowsString);


        // Append file
        formData.append('image', file);

        const response = await fetch('/api/frontend/supplier-test', {
            method: 'POST',
            body: formData,
        });

    } catch (error) {
        console.error('Error uploading data:', error);
    }

    onClose();
};




  if (!modalCreationDetails) {
    return <div>Loading...</div>;
  }


  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Create Supplier Modal"
      
    >
      <div>
        <div>
        <button onClick={onClose}>
            Close
          </button>
          <h1>New Supplier</h1>
       
        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>

            <label htmlFor="clientTypeSelect">Select Supplier Type:</label>
            <select id="clientTypeSelect" value={formValues.supplier_type} onChange={handleClientTypeChange}>
                <option value="">Select a client type...</option>
                {modalCreationDetails.allType.map(clientType => (
                    <option key={clientType.id} value={clientType.supplier_type}>
                        {clientType.supplier_type}
                    </option>
                ))}
            </select> 
              <br></br>
            
              Supplier Name:
              <input
                type="text"
                name="supplierName"
                id='supplierName'
                value={formValues.supplierName}
                onChange={handleOnChange}
              />
               
              <br></br>
              
              <br></br>

               <div>
            <AddressForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>
        <br></br>
        
        <br></br>
        <div>
          <h3>Phone Number</h3>
            <PhoneNumberForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>
        <br></br>
        <div>
          <h3>Email Address</h3>
            <EmailForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>
        <div>
          <h3>Social Media Accounts</h3>
            <SocialMediaForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>
        <br></br>
        <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff" onChange={handleFileChange} />

            </label>
            <br></br>

            <br></br>
            <button type='submit'>Create Client</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SupplierCreateModal;
