import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Modal from 'react-modal';


Modal.setAppElement('#root'); // Set the root element for the modal

const PdfView = ({ uuidFileName, onClose }) => {
  const [pdfData, setPdfData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("from inside the view here is the filename", uuidFileName)
        const response = await fetch(`/api/download/pdf/${uuidFileName}`);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setPdfData(dataUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchData();
  }, [uuidFileName]);

  return (
    <Modal
      isOpen={!!pdfData}
      onRequestClose={onClose}
      contentLabel="PDF Viewer Modal"
    >
      <div style={{ width: '100%', height: '500px' }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
          {pdfData && <Viewer fileUrl={pdfData} />}
        </Worker>
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default PdfView;