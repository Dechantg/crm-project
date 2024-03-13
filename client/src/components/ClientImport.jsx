import React, { useState, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import '../views/Document.scss'



const ClientImport = () => {
const [formValues, setFormValues] = useState({
  name: "",
});

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('name', Name);
    formData.append('description', description);

  }
const handleOnChange = async (event) => {
  const {name, value} = event.target
  setFormValues({
    ...formValues,
    [name]: value,
  });
console.log("event: ", event);
console.log("value: ", value)
}

return(

<h1>

  Hellow Worlkd
  <form onSubmit={handleUpload}>
    <label htmlFor="name"
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