import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ImageView = ({ uuidFileName, onClose }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("From inside the view, here is the filename", uuidFileName);
        const response = await fetch(`/api/download/image/${uuidFileName}`);
        const blob = await response.blob();
        const dataUrl = URL.createObjectURL(blob);
        setImageData(dataUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchData();
  }, [uuidFileName]);

  return (
    <Modal
      isOpen={!!imageData}
      onRequestClose={onClose}
      contentLabel="Image Viewer Modal"
    >
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        {imageData && (
          <>
            <img
              src={imageData}
              alt="Image"
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <p></p>
            </div>
          </>
        )}
      </div>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ImageView;