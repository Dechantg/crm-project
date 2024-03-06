import React, { useState, useEffect } from 'react';
import DocumentViewer from './DocumentViewer';
import '../views/Document.scss'


const DocumentImport = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getdocument');
        const data = await response.json();

        setJsonData(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, []);


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
      const response = await fetch('/api/upload/sheet', {
        method: 'POST',
        body: formData,
        // credentials: 'include',
      });

      const data = await response.json();

      console.log(data);

      setJsonData(data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDocumentClick = (document) => {
    console.log("document click", document)
    setSelectedDocument(document);
    setShowDocumentModal(true);
  };

  const handleCloseDocumentModal = () => {
    setShowDocumentModal(false);
    setSelectedDocument(null);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange}
      accept=".csv"
      />
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
            const queryResult = jsonData.querryResult || [];
            const resultElements = [];

            for (const result of queryResult) {
              resultElements.push(
                <div key={result.id} onClick={() => handleDocumentClick(result)}>
                  <div>
                    <p className="link" >File Name: {result.file_name}</p>
                    <p>Description: {result.file_description}</p>
                  </div>
                </div>
              );
            }

            return <div>{resultElements}</div>;
          })()}
        </div>
      )}

      {showDocumentModal && (
        <DocumentViewer
        selectedDocument={selectedDocument}
        onClose={handleCloseDocumentModal}
        />
      )}
    </div>
  );
};

export default DocumentImport;