import React, { useState, useEffect } from 'react';

const SocialMediaForm = ({ clientCreationDetails, formValues, setFormValues }) => {
    const [socialMediaRows, setSocialMediaRows] = useState([
        {
            socialType: '',
            socialmedia: ''
        }
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            socialMediaRows
        });
    }, [socialMediaRows]);

    const handleOnChange = (event, index) => {
        const { name, value } = event.target;
        const updatedRows = [...socialMediaRows];
        updatedRows[index][name] = value;
        setSocialMediaRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            socialMediaRows: updatedRows
        });
    };

    const handleSocialMediaChange = (event, index) => {
        const selectedSocialMediaId = event.target.value;
        const updatedRows = [...socialMediaRows];
        updatedRows[index].socialType = selectedSocialMediaId;
        setSocialMediaRows(updatedRows);

        // Update formValues directly
        setFormValues({
            ...formValues,
            socialMediaRows: updatedRows
        });
    };

    const addRow = () => {
        setSocialMediaRows([
            ...socialMediaRows,
            {
                socialType: '',
                socialmedia: ''
            }
        ]);
    };

    const removeRow = (index) => {
        if (socialMediaRows.length > 1) {
            const updatedRows = [...socialMediaRows];
            updatedRows.splice(index, 1);
            setSocialMediaRows(updatedRows);

            // Update formValues directly
            setFormValues({
                ...formValues,
                socialMediaRows: updatedRows
            });
        }
    };

    return (
        <div>
            {socialMediaRows.map((row, index) => (
                <div key={index}>
                    <label htmlFor={`socialMediaTypeSelect-${index}`}>Select Social Media Type:</label>
                    <select id={`socialMediaTypeSelect-${index}`}
                            value={row.socialType}
                            onChange={(event) => handleSocialMediaChange(event, index)}>
                        <option value="">Social Media Type...</option>
                        {clientCreationDetails.allSocialMediaType.map(socialMediaType => (
                            <option key={socialMediaType.id} value={socialMediaType.id}>
                                {socialMediaType.social_media_type}
                            </option>
                        ))}
                    </select>

                    <label htmlFor={`socialmedia-${index}`}>Social Media Account:</label>
                    <input
                        type="text"
                        name="socialmedia"
                        id={`socialmedia-${index}`}
                        value={row.socialmedia}
                        onChange={(event) => handleOnChange(event, index)}
                    />

                    <button type="button" onClick={() => removeRow(index)} disabled={socialMediaRows.length === 1 && index === 0}>
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

export default SocialMediaForm;
