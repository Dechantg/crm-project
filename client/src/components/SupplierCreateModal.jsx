
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
  const [selectedContact, setSelectedContact] = useState('');

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

  const filteredContacts = modalCreationDetails && modalCreationDetails.allContact
  ? modalCreationDetails.allContact.filter(contact => contact.entity_class === '3')
  : [];

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  const handleContactChange = (event) => {
    const selectedContact = event.target.value
    console.log("from inside the contact change", selectedContact)
    setFormValues({
      ...formValues,
      contactEntityId: selectedContact,
    });  };


  const handleSupplierTypeChange = (event) => {    
    const selectedSupplierType = event.target.value;
    const [id, supplierType] = selectedSupplierType.split(',');

    setFormValues({
        ...formValues,
        entityTypeId: id,
        entityType: supplierType,
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

        const response = await fetch('/api/add/supplier/generate', {
        // const response = await fetch('/api/frontend/test', {
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

            <label htmlFor="supplierTypeSelect">Select Supplier Type:</label>
            <select id="supplierTypeSelect" value={formValues.supplier_type} onChange={handleSupplierTypeChange}>
                <option value="">Select a client type...</option>
                {modalCreationDetails.allType.map(supplierType => (
        <option key={supplierType.id} value={`${supplierType.id},${supplierType.supplier_type}`}>
        {supplierType.supplier_type}
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
            <div>
      <label htmlFor="contactSelect">Assign Supplier Contact:</label>
      <select id="contactSelect" value={formValues.entity_id} onChange={handleContactChange}>
        <option value="">Select a contact...</option>
        {filteredContacts.map(contact => (
          <option key={contact.entity_id} value={contact.entity_id}>
            {contact.honorific && `${contact.honorific} `}
            {`${contact.first_name} ${contact.last_name} --- ${contact.entity_type}`}
          </option>
        ))}
      </select>
    </div>
        <br></br>
        Supplier Logo: 
        <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff" onChange={handleFileChange} />
        <br></br>

            </label>
            <br></br>
            <br></br>
            <button type='submit'>Create Supplier</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default SupplierCreateModal;
