
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AddressForm from './forms/AddressForm.jsx';
import SocialMediaForm from './forms/SocialMediaForm.jsx';
import PhoneNumberForm from './forms/PhoneNumberForm.jsx';
import EmailForm from './forms/EmailForm.jsx';
import BusinessClassForm from './forms/BussinesClassForm.jsx'

const BusinessCreateModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [modalCreationDetails, setModalCreationDetails] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedContact, setSelectedContact] = useState('');
  const [formValues, setFormValues] = useState({});



  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/business');
        const data = await responce.json();
        console.log("data from my backend: ", data.creationDetails)
        // setAllContact(data.creationDetails.allType)

        setModalCreationDetails(data.creationDetails);
      } catch (error) {
        console.error('Error fetching business data: ', error);
      }
    };
    fetchData();
  }, []);

  const filteredContacts = modalCreationDetails && modalCreationDetails.allContact
    ? modalCreationDetails.allContact.filter(contact => contact.entity_class === '2')
    : [];

    const filteredAgents = modalCreationDetails && modalCreationDetails.allContact
    ? modalCreationDetails.allContact.filter(contact => contact.entity_class === '1')
    : [];

console.log("the filtered details after everything set", filteredContacts);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

//   const handleClientTypeChange = (event) => {
//     const selectedClientType = event.target.value;
//     const [id, clientType] = selectedClientType.split(',');
// console.log("from inside the client type", selectedClientType)
//     setFormValues({
//         ...formValues,
//         entityTypeId: id,
//         entityType: clientType,
//     });
// };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContactChange = (event) => {
    const selectedContact = event.target.value
    console.log("from inside the contact change", selectedContact)
    setFormValues({
      ...formValues,
      contactEntityId: selectedContact,
    });  };



  const handleAgentChange = (event) => {
    const selectedAgent = event.target.value
    setFormValues({
      ...formValues,
      agentEntityId: selectedAgent,
    });  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const formData = new FormData();
        
        for (const key in formValues) {
            if (Object.prototype.hasOwnProperty.call(formValues, key)) {
                formData.set(key, formValues[key]);
            }
        }

       
        const entityClassRowsString = JSON.stringify(formValues.entityClassRows);
        formData.set('entityClassRows', entityClassRowsString);

        const phoneNumberRowsString = JSON.stringify(formValues.phoneNumberRows);
        formData.set('phoneNumberRows', phoneNumberRowsString);

        const socialMediaRowsString = JSON.stringify(formValues.socialMediaRows);
        formData.set('socialMediaRows', socialMediaRowsString);

        const emailRowsString = JSON.stringify(formValues.emailRows);
        formData.set('emailRows', emailRowsString);


        // Append file
        formData.append('image', file);

        // const response = await fetch('/api/add/business/generate', {
        const response = await fetch('/api/frontend/test', {
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
      contentLabel="Create Business Modal"
      
    >
      <div>
        <div>
        <button onClick={onClose}>
            Close
          </button>
          <h1>Add New Business</h1>
          <br></br>
        <div>
          <h3>Business Class</h3>
            <BusinessClassForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>


        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>

            {/* <label htmlFor="clientTypeSelect">Select Customer Type:</label>
            <select id="clientTypeSelect" value={formValues.client_type} onChange={handleClientTypeChange}>
                <option value="">Select a customer type...</option>
                {modalCreationDetails.allType.map(clientType => (
                    <option key={clientType.id} value={`${clientType.id},${clientType.client_type}`}>
                        {clientType.client_type}
                    </option>
                ))}
            </select> 
              <br></br> */}
            
              Business Name:
              <input
                type="text"
                name="businessName"
                id='businessName'
                value={formValues.businessName}
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
        Business Logo: 
        <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff" onChange={handleFileChange} />

            </label>
            <br></br>
            <br></br>

            <div>
      <label htmlFor="contactSelect">Assign Business Contact:</label>
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

    <div>
      <label htmlFor="agentSelect">Assign Sales Agent:</label>
      <select id="agentSelect" value={formValues.entity_id} onChange={handleAgentChange}>
        <option value="">Select an Agent...</option>
        {filteredAgents.map(contact => (
          <option key={contact.entity_id} value={contact.entity_id}>
            {contact.honorific && `${contact.honorific} `}
            {`${contact.first_name} ${contact.last_name}`}
          </option>
        ))}
      </select>
    </div>
    <br></br>

            <br></br>
            <button type='submit'>Create Business</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default BusinessCreateModal;
