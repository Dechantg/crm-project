import React, { useEffect, useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewerComponent = () => {
  const [pdfData, setPdfData] = useState(null);

  const pdfId = '3bae587e-211c-42aa-bb35-d767a9e10057';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/download/pdf/${pdfId}`);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setPdfData(dataUrl);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`}>
        {pdfData && <Viewer fileUrl={pdfData} />}
      </Worker>
    </div>
  );
};

export default PdfViewerComponent;