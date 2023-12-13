import React, { useState } from 'react';

const DocumentImport = () => {
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload/sheet', {
        method: 'POST',
        body: formData,
        // credentials: 'include',
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
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {jsonData && (
        <div>
          <h2>Converted JSON</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(jsonData[0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DocumentImport;