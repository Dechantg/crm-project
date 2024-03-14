import React, { useState, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import '../views/Document.scss'



const ClientImport = () => {
const [file, setFile] = useState(null);

const [formValues, setFormValues] = useState({
  description: "",
});

const handleOnChange = async (event) => {
  event.preventDefault();
  const {name, value} = event.target
  setFormValues({
    ...formValues,
    [name]: value,
  });

  setFile(formValues.image);
  if(name==='image' && event.target.files[0]){
    setFile(event.target.files[0]);  
  }
  

  // console.log("event: ", event);
  console.log("value: ", value)
}

const handleUpload = async (event) => {
  event.preventDefault();

  //uoload with image
  try {
  const formData = new FormData();
 for (const key in formValues){
  if (Object.prototype.hasOwnProperty.call(formValues, key)){
    formData.set(key, formValues[key]);
  }
 }
formData.set('image', file);

  const response = await fetch('api/upload/image', {
    method: 'POST',
    body: formData,
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    //   },
    
});

  console.log("post responce variable: ", response);


  
  // formData.append('description', description);
  console.log("Clicky Click", formValues)

  } catch (error) {
    console.error('Error fetching document:', error); 
}
}
return(

<h1>

New Client: 

<form encType="multipart/form-data" method="POST" onSubmit={handleUpload}>
    <label 
    >Name:</label>

    <input type="text"
    name='description'
    id='description'
    onChange={handleOnChange}
    value={formValues.description} />

<label>
  File: </label>

   <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff"
    name='image'
    id='image'
    onChange={handleOnChange}
    // value={formValues.image}
    />

<button type='submit'>Upload</button>

  </form>
</h1>

)

}

export default ClientImport;