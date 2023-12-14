import React, { useState } from 'react';

const PdfImport = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload/pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      // Handle the response
      console.log(data);

      // Set the JSON data in the state
      setJsonData(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload a PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {jsonData && (
        <div>
          <h2>Server Response</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PdfImport;