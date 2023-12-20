
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
// import '../views/Modal.scss'

Modal.setAppElement('#root');

const DocumentViewer = ({ selectedDocument, onClose }) => {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/download/document/${selectedDocument.uuid_file_name}`);
        const json = await response.json();
        setJsonData(json);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [selectedDocument]);

  return (
    <Modal
    isOpen={!!jsonData}
    onRequestClose={onClose}
    contentLabel="Document Viewer Modal"
    style={{
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        maxHeight: '80vh',
        maxWidth: '80vw',
        overflowY: 'auto',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    }}
  >
    <div className="modal-content">
      <div className="modal-header">
        <h2>Modal Header</h2>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="scroll-container">
        <div className="wide-content">
      {jsonData && (
        <div>
          <h2>Converted JSON</h2>
          <table className="custom-table">
      <thead>
      <tr className="table-header-row">
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
  </div>
</div>
<div className="modal-overlay"></div>


    </Modal>
  );
};

export default DocumentViewer;