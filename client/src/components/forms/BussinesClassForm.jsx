import React, { useState, useEffect } from 'react';

const EntityClassForm = ({ modalCreationDetails, formValues, setFormValues }) => {
    const [entityClassRows, setEntityClassRows] = useState([
        {
            entityClassType: ''
        }
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            entityClassRows
        });
    }, [entityClassRows]);

    const handleEntityClassChange = (event, index) => {
        const selectedEntityClassId = event.target.value;
        const updatedRows = [...entityClassRows];
        updatedRows[index].entityClassType = selectedEntityClassId;
        setEntityClassRows(updatedRows);
        console.log("entity class change")

        // Update formValues directly
        setFormValues({
            ...formValues,
            entityClassRows: updatedRows
        });
    };

    const addRow = () => {
        setEntityClassRows([
            ...entityClassRows,
            {
                entityClassType: ''
            }
        ]);
    };

    const removeRow = (index) => {
        if (entityClassRows.length > 1) {
            const updatedRows = [...entityClassRows];
            updatedRows.splice(index, 1);
            setEntityClassRows(updatedRows);

            // Update formValues directly
            setFormValues({
                ...formValues,
                entityClassRows: updatedRows
            });
        }
    };

    const handleBusinessTypeChange = (event) => {
      const selectedClientType = event.target.value;
      const [id, clientType] = selectedClientType.split(',');
  console.log("from inside the client type", selectedClientType)
      setFormValues({
          ...formValues,
          entityTypeId: id,
          entityType: clientType,
      });
  };

    return (
        <div>
            {entityClassRows.map((row, index) => (
                <div key={index}>
                    <label htmlFor={`entityClassTypeSelect-${index}`}>Select Business Class:</label>
                    <select id={`entityClassTypeSelect-${index}`}
                            value={row.entityClassType}
                            onChange={(event) => handleEntityClassChange(event, index)}>
                        <option value="">Business Class...</option>
                        {modalCreationDetails.allEntityClass.map(entityClass => (
                            <option key={entityClass.id} value={entityClass.id}>
                                {entityClass.entity_class_name}
                            </option>
                        ))}
                    </select>

                    <button type="button" onClick={() => removeRow(index)} disabled={entityClassRows.length === 1 && index === 0}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addRow}>
                Add Row
            </button>
            <br></br>
            <br></br>


            <label htmlFor="businessTypeSelect">Select Business Type:</label>
            <select id="businessTypeSelect" value={formValues.entity_type_name} onChange={handleBusinessTypeChange}>
                <option value="">Select a business type...</option>
                {modalCreationDetails.allType.map(businessType => (
                    <option key={businessType.id} value={`${businessType.id},${businessType.entity_type_name}`}>
                        {businessType.entity_type_name}
                    </option>
                ))}
            </select> 
              <br></br>
              <br></br>

        </div>
    );
};

export default EntityClassForm;
