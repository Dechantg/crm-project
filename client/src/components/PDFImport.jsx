import React, { useState, useEffect } from 'react';
import PdfView from './PdfView';

const PdfImport = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [selectedUuid, setSelectedUuid] = useState(null);
  const [showPdfModal, setShowPdfModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getpdf');
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

  const handleClosePdfModal = () => {
    setShowPdfModal(false);
    setSelectedUuid(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', description);


    try {
      const response = await fetch('/api/upload/pdf', {
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

  const handleThumbnailClick = (uuidFileName) => {
    console.log('Thumbnail clicked. UUID File Name:', uuidFileName);

    setSelectedUuid(uuidFileName);
    setShowPdfModal(true);
  };

  return (
    <div>
      <h2>Upload a PDF</h2>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
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
  const queryResult = jsonData.pdf || [];
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
            src={`data:image/jpeg;base64,${matchingThumbnail.data}`} 
            alt={matchingThumbnail.name}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
            onClick={() => handleThumbnailClick(result.uuid_file_name)}
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

        {showPdfModal && (
        <PdfView
          uuidFileName={selectedUuid}
          onClose={handleClosePdfModal}
        />
      )}

    </div>
  );
};

export default PdfImport;