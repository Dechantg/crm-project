

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../views/Modal.scss'
import '../views/Document.scss'
import AlcoholiclForm from './forms/AlcoholicForm'

const ProductCreateModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [suppliers, setSuppliers] = useState(null);
  const [allAlch, setAllAlch] = useState(null);
  const [allNonAlch, setAllNonAlch] = useState(null);
  const [allProductClass, setAllProductClass] = useState(null);
  const [selectedProductClass, setSelectedProductClass] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('/api/add/product');
        const data = await responce.json();
        console.log("data from my backend: ", data);
        setAllAlch(data.allAlch);
        setAllNonAlch(data.allNonAlch);
        setSuppliers(data.suppliers);
        setAllProductClass(data.allProductClass);

        console.log("here is my supliers form data", data.suppliers)
      } catch (error) {
        console.error('Error fetching contact data: ', error);
      }
    };
    fetchData();
  }, []);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSupplierChange = (event) => {
    const selectedSupplier = event.target.value;
    const [id, supplier_name] = selectedSupplier.split(',');

    setFormValues({
        ...formValues,
        supplierId: id,
        supplierName: supplier_name,
    });
};

const handleAlchClassChange = (event) => {
  const selectedAlchClass = event.target.value;
  const [id, alch_type] = selectedAlchClass.split(',');

  setFormValues({
      ...formValues,
      alchClassId: id,
      alchClassName: alch_type,
  });
};

const handleNonAlchClassChange = (event) => {
  const selectedNonAlchClass = event.target.value;
  const [id, non_alch_type] = selectedNonAlchClass.split(',');

  setFormValues({
      ...formValues,
      nonAlchClassId: id,
      nonAlchClassName: non_alch_type,
  });
};
const handleProductClassChange = (event) => {
  const selectedProductClass = event.target.value;
  const [id, product_class_name] = selectedProductClass.split(',');

  setSelectedProductClass(id);
  console.log("checking for the slecteded product class", selectedProductClass)


  setFormValues({
      ...formValues,
      productClassId: id,
      productClassName: product_class_name,
  });
};

const handleBottleChange = (event) => {
  const selectedBottleSize = event.target.value;
  
  const isValidBottleSize = /^(\d+(\.\d{1,3})?|\.\d{1,3})$/.test(selectedBottleSize);


  if (isValidBottleSize || selectedBottleSize === '') {
    setFormValues({
      ...formValues,
      bottleSize: selectedBottleSize,
    });
  }
};


const handleAlchPercentChange = (event) => {
  const selectedAlchPercent = event.target.value;
  
  const isValidBottleSize = /^(\d+(\.\d{1,2})?|\.\d{1,2})$/.test(selectedAlchPercent);


  if (isValidBottleSize || selectedAlchPercent === '') {
    setFormValues({
      ...formValues,
      alcoholPercent: selectedAlchPercent,
    });
  }
};


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      for (const key in formValues) {
        if (Object.prototype.hasOwnProperty.call(formValues, key)) {
          formData.set(key, formValues[key]);
        }
      }

      formData.append('image', file);

      const response = await fetch('/api/add/product/generate', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error('Error uploading data:', error);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={onClose}
      contentLabel="Create Contact Modal"
    >
      <div>
        <div>
          <button onClick={onClose}>Close</button>
          <h1>New Product</h1>
        </div>
        <div className="scroll-container">
          <form encType="multipart/form-data" method="POST" onSubmit={handleSubmit}>
            <label></label>


          <label htmlFor="supplierSelect">Select Supplier: </label>
            {suppliers && suppliers.length > 0 && (              <select required id="supplierSelect" value={formValues.supplier_id} onChange={handleSupplierChange}>
            <option value="">Select a supplier...</option>
            {suppliers.map(supplier => (
            <option key={supplier.id} value={`${supplier.id},${supplier.supplier_name}`}>
                {supplier.supplier_name}
            </option>
            ))}
           </select>
            )}
              <br></br>
              <br></br>

              <label htmlFor="productClassSelect">Select Product Class: </label>
            {suppliers && suppliers.length > 0 && (              <select required id="productClassSelect" value={formValues.product_class} onChange={handleProductClassChange}>
            <option value="">Select a product class...</option>
            {allProductClass.map(productClass => (
            <option key={productClass.id} value={`${productClass.id},${productClass.product_class_name}`}>
                {productClass.product_class_name}
            </option>
             ))}
           </select>
            )}
              <br></br>
              <br></br>

              Product Name:
              <input
                type="text"
                name="productName"
                id='productName'
                value={formValues.productName}
                onChange={handleOnChange}
                required  
              />
              <br></br>
            <br></br>
            Bottle size (volume per litre):
              <input
                type="number"
                step="1.0"
                name="bottleSize"
                id='bottleSize'
                value={formValues.bottleSize}
                onChange={handleBottleChange}
                required  
              />
              <br></br>
            <br></br>
            Case Format:
              <input
                type="number"
                step="1.0"
                name="caseFormat"
                id='caseFormat'
                value={formValues.caseFormat}
                onChange={handleOnChange}
                required  
              />
            <br></br>
            <br></br>

           {selectedProductClass === "1" && (
  <div>
    <h3>Alcoholic Options</h3>
    {/* Render Alcoholic Form */}

    <label htmlFor="alchClassSelect">Select Alcoholic Class: </label>
            {allAlch && allAlch.length > 0 && (              <select required id="alchClass" value={formValues.alch_class} onChange={handleAlchClassChange}>
            <option value="">Select a Class...</option>
            {allAlch.map(alch => (
            <option key={alch.id} value={`${alch.id},${alch.alch_type}`}>
                {alch.alch_type}
            </option>
            ))}
           </select>
            )}
              <br></br>
              <br></br>
              ABV (percentage):
              <input
              required
                type="number"
                step=".1"
                min="0"
                max="100"
                name="alcoholPercent"
                id='alcoholPercent'
                value={formValues.alcoholPercent}
                onChange={handleAlchPercentChange}
              />
              <br></br>
            <br></br>

    {/* <AlcoholicForm
      modalCreationDetails={modalCreationDetails}
      formValues={formValues}
      setFormValues={setFormValues}
    /> */}
  </div>
)}

{selectedProductClass === "2" && (
  <div>
    <h3>Non Alcoholic Options</h3>
    {/* Render Non Alcoholic Form */}

    <label htmlFor="nonAlchClassSelect">Select Non Alcoholic Class: </label>
            {allNonAlch && allNonAlch.length > 0 && (              <select required id="nonAlchClass" value={formValues.non_alch_class} onChange={handleNonAlchClassChange}>
            <option value="">Select a Class...</option>
            {allNonAlch.map(nonAlch => (
            <option key={nonAlch.id} value={`${nonAlch.id},${nonAlch.non_alch_type}`}>
                {nonAlch.non_alch_type}
            </option>
            ))}
           </select>
            )}
              <br></br>
              <br></br>

  </div>
)}




            Product Image:
        <input type="file" accept=".bmp,.png,.gif,.jpeg,.jpg,.tiff" onChange={handleFileChange} />
            <br></br>

            <h4>Submit New Product</h4>
            <button type='submit'>Create Product</button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProductCreateModal;
