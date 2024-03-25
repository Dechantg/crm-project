import React, { useState, useEffect } from 'react';

const EntityClassForm = ({ modalCreationDetails, formValues, setFormValues }) => {
    const [entityClassRows, setEntityClassRows] = useState([
        {
            entityClass: ''
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
        updatedRows[index].entityClass = selectedEntityClassId;
        setEntityClassRows(updatedRows);
        console.log("entity class change")

        // Update formValues directly
        setFormValues({
            ...formValues,
            entityClassRows: updatedRows
        });
    };

    const handleBusinessTypeChange = (event, index) => {
      const selectedBusinessTypeId = event.target.value;
      const updatedRows = [...entityClassRows];
      updatedRows[index] = {
          ...updatedRows[index],
          entityType: selectedBusinessTypeId
      };
      setEntityClassRows(updatedRows);
  };

    const addRow = () => {
        setEntityClassRows([
            ...entityClassRows,
            {
                entityClass: ''
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


    return (
        <div>

{entityClassRows.map((row, index) => (
    <div key={index}>
        <label htmlFor={`entityClassSelect-${index}`}>Select Business Class:</label>
        <select id={`entityClassSelect-${index}`}
                value={row.entityClass}
                onChange={(event) => handleEntityClassChange(event, index)}>
            <option value="">Business Class...</option>
            {modalCreationDetails.allEntityClass.map(entityClass => (
                <option key={entityClass.id} value={entityClass.id}>
                    {entityClass.entity_class_name}
                </option>
            ))}
        </select>


        <label htmlFor={`enityType-${index}`}>Select Business Type:</label>
        <select
    id={`enityType-${index}`}
    value={row.businessType}
    onChange={(event) => handleBusinessTypeChange(event, index)}
>
    <option value="">Select a business type...</option>
    {modalCreationDetails.allType.map(businessType => (
        <option key={businessType.id} value={businessType.id}>
            {businessType.entity_type_name}
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

        </div>
    );
};

export default EntityClassForm;
