import React, { useState, useEffect } from 'react';

const EmailForm = ({ modalCreationDetails, formValues, setFormValues }) => {
    const [emailRows, setEmailRows] = useState([
        {
            emailType: '',
            email: ''
        }
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            emailRows
        });
    }, [emailRows]);

    const handleOnChange = (event, index) => {
        const { name, value } = event.target;
        const updatedRows = [...emailRows];
        updatedRows[index][name] = value;
        setEmailRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            emailRows: updatedRows
        });
    };

    const handleEmailChange = (event, index) => {
        const selectedEmailId = event.target.value;
        const updatedRows = [...emailRows];
        updatedRows[index].emailType = selectedEmailId;
        setEmailRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            emailRows: updatedRows
        });
    };

    const addRow = () => {
        setEmailRows([
            ...emailRows,
            {
                emailType: '',
                email: ''
            }
        ]);
    };

    const removeRow = (index) => {
        if (emailRows.length > 1) {
            const updatedRows = [...emailRows];
            updatedRows.splice(index, 1);
            setEmailRows(updatedRows);

            // Update formValues directly
            setFormValues({
                ...formValues,
                emailRows: updatedRows
            });
        }
    };

    return (
        <div>
            {emailRows.map((row, index) => (
                <div key={index}>
                    <label htmlFor={`emailTypeSelect-${index}`}>Select Email Type:</label>
                    <select id={`emailTypeSelect-${index}`}
                            value={row.emailType}
                            onChange={(event) => handleEmailChange(event, index)}>
                        <option value="">Email Type...</option>
                        {modalCreationDetails.allEmailType.map(emailType => (
                            <option key={emailType.id} value={emailType.id}>
                                {emailType.email_type}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`email-${index}`}>Email Address:</label>
                    <input
                        type="text"
                        name="email"
                        id={`email-${index}`}
                        value={row.email}
                        onChange={(event) => handleOnChange(event, index)}
                    />

                    <button type="button" onClick={() => removeRow(index)} disabled={emailRows.length === 1 && index === 0}>
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

export default EmailForm;
