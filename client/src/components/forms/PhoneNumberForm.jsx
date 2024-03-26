import React, { useState, useEffect } from 'react';

const PhoneNumberForm = ({ modalCreationDetails, formValues, setFormValues }) => {
    const [phoneNumberRows, setPhoneNumberRows] = useState([
        {
            phoneType: '',
            phoneNumber: '',
        }
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            phoneNumberRows,
        });
    }, [phoneNumberRows]);

    const handleOnChange = (event, index) => {
        const { name, value } = event.target;
        const updatedRows = [...phoneNumberRows];
        updatedRows[index][name] = value;
        setPhoneNumberRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            phoneNumberRows: updatedRows
        });
    };

    const handlePhoneNumberChange = (event, index) => {
        const selectedPhoneNumberId = event.target.value;
        const updatedRows = [...phoneNumberRows];
        updatedRows[index].phoneType = selectedPhoneNumberId;
        setPhoneNumberRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            phoneNumberRows: updatedRows,
        });
    };

    const addRow = () => {
      setPhoneNumberRows([
            ...phoneNumberRows,
            {
                phoneType: '',
                phoneNumber: '',
            }
        ]);
    };

    const removeRow = (index) => {
        if (phoneNumberRows.length > 1) {
            const updatedRows = [...phoneNumberRows];
            updatedRows.splice(index, 1);
            setPhoneNumberRows(updatedRows);

            // Update formValues directly
            setFormValues({
                ...formValues,
                phoneNumberRows: updatedRows,
            });
        }
    };

    return (
        <div>
            {phoneNumberRows.map((row, index) => (
                <div key={index}>
                    <label htmlFor={`phoneTypeSelect-${index}`}>Select Phone Type:</label>
                    <select id={`phoneTypeSelect-${index}`}
                            value={row.phoneType}
                            onChange={(event) => handlePhoneNumberChange(event, index)}>
                        <option value="">Phone Type...</option>
                        {modalCreationDetails.allPhoneType.map(phoneType => (
                            <option key={phoneType.id} value={phoneType.id}>
                                {phoneType.phone_number_type}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`phoneNumber-${index}`}>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        id={`phoneNumber-${index}`}
                        value={row.phoneNumber}
                        onChange={(event) => handleOnChange(event, index)}
                    />

                    <button type="button" onClick={() => removeRow(index)} disabled={phoneNumberRows.length === 1 && index === 0}>
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

export default PhoneNumberForm;
