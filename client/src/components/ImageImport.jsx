import React, { useState, useEffect } from 'react';

const ImageImport = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getimage');
        const data = await response.json();

        setJsonData(data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchData();
  }, []); // Fetch images when the component mounts

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);

    try {
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      setJsonData(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter description"
        value={description}
        onChange={handleDescriptionChange}
      />
      <button onClick={handleUpload}>Upload</button>

      {jsonData && (
  <div>
    <h2>Server Response</h2>

    {(() => {
  const queryResult = jsonData.images || [];
  const thumbnails = jsonData.thumbnails || [];

  console.log("here is the queryResults object", queryResult);
  console.log("here is the thumbnails object", thumbnails);

  const resultElements = [];

  for (const result of queryResult) {
    const matchingThumbnail = thumbnails.find(
      (thumbnail) => thumbnail.name === result.thumbnail
    );

    resultElements.push(
      <div key={result.id}>
        {matchingThumbnail && (
          <div>
            <img
              src={`data:image/jpeg;base64,${matchingThumbnail.data}`} // Assuming thumbnails are JPEG
              alt={matchingThumbnail.name}
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
            <div>
              <p>File Name: {result.file_name}</p>
              <p>Description: {result.file_description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>{resultElements}</div>;
})()}
  </div>
)}
    </div>
  );
};

export default ImageImport;