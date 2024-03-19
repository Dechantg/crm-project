
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AddressForm from './AddressForm.jsx';
import SocialMediaForm from './SocialMediaForm.jsx';
import PhoneNumberForm from './PhoneNumberForm.jsx';
import EmailForm from './EmailForm.jsx';

const ContactCreateModal = ({ onClose }) => {
  const [modalCreationDetails, setModalCreationDetails] = useState(null);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/contact');
        const data = await responce.json();
        console.log("data from my backend: ", data.creationDetails)

        setModalCreationDetails(data.creationDetails);
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
  }

  const handleContactClassChange = (event) => {
    const selectedContactClass = event.target.value;
    const [id, contactType] = selectedContactClass.split(',');

    setFormValues({
        ...formValues,
        entityClassId: id,
        entityClass: contactType,
    });
};

const handleContactTypeChange = (event) => {
  const selectedContactType = event.target.value;
  const [id, contactType] = selectedContactType.split(',');

  setFormValues({
      ...formValues,
      entityTypeId: id,
      entityType: contactType,
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

        const phoneNumberRowsString = JSON.stringify(formValues.phoneNumberRows);
        formData.set('phoneNumberRows', phoneNumberRowsString);

        const socialMediaRowsString = JSON.stringify(formValues.socialMediaRows);
        formData.set('socialMediaRows', socialMediaRowsString);

        const emailRowsString = JSON.stringify(formValues.emailRows);
        formData.set('emailRows', emailRowsString);


        const response = await fetch('/api/add/contact/generate', {
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
      contentLabel="Create Contact Modal"
      
    >
      <div>
        <div>
        <button onClick={onClose}>
            Close
          </button>
          <h1>New Contact</h1>
       
        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>

            <label htmlFor="contactTypeSelect">Select Contact Class:</label>
            <select id="contactTypeSelect" value={formValues.entity_class} onChange={handleContactClassChange}>
                <option value="">Select a contact Class...</option>
                {modalCreationDetails.allEntityClass.map(entityClass => (
                    <option key={entityClass.id} value={`${entityClass.id},${entityClass.entity_class_name}`}>
                        {entityClass.entity_class_name}
                    </option>
                ))}
            </select> 
              <br></br>
              <br></br>


            <label htmlFor="contactTypeSelect">Select Contact Type:</label>
            <select id="contactTypeSelect" value={formValues.contact_type} onChange={handleContactTypeChange}>
                <option value="">Select a contact type...</option>
               {modalCreationDetails.allContactClass
               .filter(contactType => contactType.entity_class === formValues.entityClassId)
              .map(contactType => (
                <option key={contactType.id} value={`${contactType.id},${contactType.contact_type}`}>
                  {contactType.contact_type}
                </option>
            ))}
            </select>
            <br></br>

              <br></br>
              Honorific:
              <input
                type="text"
                name="contactHonorific"
                id='contactHonorific'
                value={formValues.contactHonorific}
                onChange={handleOnChange}
              />
                             <br></br>

              <br></br>
              Contact First Name:
              <input
                type="text"
                name="contactFirstName"
                id='contactFirstName'
                value={formValues.contactFirstName}
                onChange={handleOnChange}
              />
                             <br></br>

              <br></br>
                        
              Contact Last Name:
              <input
                type="text"
                name="contactLastName"
                id='contactLastName'
                value={formValues.contactLastName}
                onChange={handleOnChange}
              />
               
              
              <br></br>
              <h3>Address</h3>

               <div>
            <AddressForm
                modalCreationDetails={modalCreationDetails}
                formValues={formValues}
                setFormValues={setFormValues}
            />
        </div>
        
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

            </label>
            <br></br>

            <br></br>
            <button type='submit'>Create Contact</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ContactCreateModal;
