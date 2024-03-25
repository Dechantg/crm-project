import React, { useState, useEffect } from 'react';

const BusinessContactForm = ({ modalCreationDetails, formValues, setFormValues }) => {
    const [contactRows, setContactRows] = useState([
        {
          contactEntityId: '',
            contactNote: ''
        }
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            contactRows
        });
    }, [contactRows]);

    const handleOnChange = (event, index) => {
        const { name, value } = event.target;
        const updatedRows = [...contactRows];
        updatedRows[index][name] = value;
        setContactRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            contactRows: updatedRows
        });
    };

    const handleContactChange = (event, index) => {
        const selectedContactId = event.target.value;
        const updatedRows = [...contactRows];
        updatedRows[index].contactEntityId = selectedContactId;
        setContactRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            contactRows: updatedRows
        });
    };

    const addRow = () => {
      setContactRows([
            ...contactRows,
            {
                contactEntityId: '',
                contactNote: ''
            }
        ]);
    };

    const removeRow = (index) => {
        if (contactRows.length > 1) {
            const updatedRows = [...contactRows];
            updatedRows.splice(index, 1);
            setContactRows(updatedRows);

            // Update formValues directly
            setFormValues({
                ...formValues,
                contactRows: updatedRows
            });
        }
    };

    return (
        <div>
            {contactRows.map((row, index) => (
                <div key={index}>
                    <label htmlFor="contactEntityIdSelect">Assign Business Contact:</label>
                    <select id={`contactEntityIdSelect-${index}`}
                            value={row.contactEntityId}
                            onChange={(event) => handleContactChange(event, index)}>
                        <option value="">Select Contact...</option>
                       {modalCreationDetails.allContact.map(contact => (
                          <option key={contact.entity_id} value={contact
                        .entity_id}>
                         {contact.honorific && `${contact.honorific} `}
                       {`${contact.first_name} ${contact.last_name} --- ${contact.contact_class_name}`}
                           </option>
                         ))}
      </select>

                    <label htmlFor={`contactNote-${index}`}>Contact Notes:</label>
                    <input
                        type="text"
                        name="contactNote"
                        id={`contactNote-${index}`}
                        value={row.contactNote}
                        onChange={(event) => handleOnChange(event, index)}
                    />

                    <button type="button" onClick={() => removeRow(index)} disabled={contactRows.length === 1 && index === 0}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addRow}>
                Add Row
            </button>
        </div>
    );
};

export default BusinessContactForm;
