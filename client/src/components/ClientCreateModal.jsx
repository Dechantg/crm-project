import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AddressForm from './AddressForm.jsx';


const ClientCreateModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [clientCreationDetails, setClientCreationDetails] = useState(null);

  const [formValues, setFormValues] = useState({
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/client');
        const data = await responce.json();
        console.log("data from my backend: ", data.clientDetails)

        setClientCreationDetails(data.clientDetails);
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


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // formData.append('description', description);


    try {
      const formData = new FormData();
      for (const key in formValues){
       if (Object.prototype.hasOwnProperty.call(formValues, key)){
         formData.set(key, formValues[key]);
       }
      }
      formData.set('image', file);

      console.log("here is the submit trigger")
      const response = await fetch('/api/frontend/client-test', {
        method: 'POST',
        body: formData,
      });

      


    } catch (error) {
      console.error('Error uploading data:', error);
      
    }
    onClose();
  }

  if (!clientCreationDetails) {
    return <div>Loading...</div>;
  }


  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Create Client Modal"
      
    >
      <div>
        <div>
        <button onClick={onClose}>
            Close
          </button>
          <h1>New Client</h1>
       
        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label>
              Client Name:
              <input
                type="text"
                name="clientName"
                id='clientName'
                value={formValues.clientName}
                onChange={handleOnChange}
              />
              <br></br>
             
               <div>
            <AddressForm
                clientCreationDetails={clientCreationDetails}
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

export default ClientCreateModal;
