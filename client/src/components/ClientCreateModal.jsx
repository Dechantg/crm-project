import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'


const ClientCreateModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [clientCreationDetails, setClientCreationDetails] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [provincesForSelectedCountry, setProvincesForSelectedCountry] = useState([]);


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

  const handleCountryChange = (event) => {
    const selectedCountryId = event.target.value;
    const selectedCountry = clientCreationDetails.allCountry.find(country => country.id === selectedCountryId);
    setSelectedCountry(selectedCountryId);

    // Filter provinces based on selected country
    const filteredProvinces = clientCreationDetails.allProvince.filter(province => province.country_code === selectedCountryId);
    setProvincesForSelectedCountry(filteredProvinces);

    setFormValues({
      ...formValues,
      countryId: selectedCountryId,
      provinceId: '', // Reset province selection when country changes
    });
  };



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // formData.append('description', description);


    // console.log("here is the submit trigger")
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
        // credentials: 'include',
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
              Street Address 1: 
              <input
                type="text"
                name="streetOne"
                id='streetOne'
                value={formValues.streetOne}
                onChange={handleOnChange}
              />
              <br></br>
              Street Address 2: 
              <input
                type="text"
                name="streetTwo"
                id='streetTwo'
                value={formValues.streetTwo}
                onChange={handleOnChange}
              />
              <br></br>
              City: 
              <input
                type="text"
                name="city"
                id='city'
                value={formValues.city}
                onChange={handleOnChange}
              /> 
              <br></br>

              <label htmlFor="countrySelect">Select Country:</label>
              <select id="countrySelect" 
              value={selectedCountry} 
              onChange={handleCountryChange}>
                <option value="">Select a country...</option>
                {clientCreationDetails.allCountry.map(country => (
                  <option key={country.id} value={country.id}>
                    {country.country_name}
                  </option>
                ))}
              </select>
              <label htmlFor="provinceSelect">Select Province/State:</label>
              <select id="provinceSelect" name="provinceId" value={formValues.provinceId} onChange={handleOnChange}>
                <option value="">Select a province...</option>
                {provincesForSelectedCountry.map(province => (
                  <option key={province.id} value={province.id}>
                    {province.province_state_name}
                  </option>
                ))}
              </select>
      
              <br></br>
              Postal Code
              <input
                type="text"
                name="postalCode"
                id='postalCode'
                value={formValues.postalCode}
                onChange={handleOnChange}
              />
              <br></br>
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
