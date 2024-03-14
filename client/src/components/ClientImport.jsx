import React, { useState, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import '../views/Document.scss'



const ClientImport = () => {
const [formValues, setFormValues] = useState({
  name: "",
});

const handleOnChange = async (event) => {
  event.preventDefault();
  const {name, value} = event.target
  setFormValues({
    ...formValues,
    [name]: value,
  });
  // console.log("event: ", event);
  // console.log("value: ", value)
}

const handleUpload = async (event) => {
  event.preventDefault();

  try {
  const response = await fetch('api/test', {
    method: 'POST',
    body: formValues,
});

  console.log("post responce variable: ", response);


  
  // const formData = new FormData();
  // formData.append('name', Name);
  // formData.append('description', description);
  console.log("Clicky Click", formValues.name)

  } catch (error) {
    console.error('Error fetching document:', error); 
}
}
return(

<h1>

New Client: 
<form method="POST" onSubmit={handleUpload}>
    <label 
    >Name:</label>

    <input type="text"
    name='name'
    id='name'
    onChange={handleOnChange}
    value={formValues.name} />

<button type='submit'>Upload</button>

  </form>
</h1>

)

}

export default ClientImport;