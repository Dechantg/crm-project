import React, { useState, useEffect } from 'react';

const AddressForm = ({ clientCreationDetails, formValues, setFormValues }) => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [provincesForSelectedCountry, setProvincesForSelectedCountry] = useState([]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            countryId: selectedCountry,
            provinceId: '',
        });
    }, [selectedCountry]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCountryChange = (event) => {
        const selectedCountryId = event.target.value;
        setSelectedCountry(selectedCountryId);

        // Filter provinces based on selected country
        const filteredProvinces = clientCreationDetails.allProvince.filter(province => province.country_code === selectedCountryId);
        setProvincesForSelectedCountry(filteredProvinces);
    };

    return (
        <div>
            <label htmlFor="streetOne">Street Address 1:</label>
            <input
                type="text"
                name="streetOne"
                id="streetOne"
                value={formValues.streetOne}
                onChange={handleOnChange}
            />
            <br />

            <label htmlFor="streetTwo">Street Address 2:</label>
            <input
                type="text"
                name="streetTwo"
                id="streetTwo"
                value={formValues.streetTwo}
                onChange={handleOnChange}
            />
            <br />

            <label htmlFor="city">City:</label>
            <input
                type="text"
                name="city"
                id="city"
                value={formValues.city}
                onChange={handleOnChange}
            />
            <br />

            <label htmlFor="countrySelect">Select Country:</label>
            <select id="countrySelect"
                    value={selectedCountry}
                    onChange={handleCountryChange}>
                <option value="">Select a country...</option>
                {clientCreationDetails.allCountry.map(country => (
                    <option key={country.id} value={country.id}>
                        {country.country_name}
                    </option>
                ))}
            </select>
            
            <label htmlFor="provinceSelect">Select Province/State:</label>
            <select id="provinceSelect"
                    name="provinceId"
                    value={formValues.provinceId}
                    onChange={handleOnChange}>
                <option value="">Select a province...</option>
                {provincesForSelectedCountry.map(province => (
                    <option key={province.id} value={province.id}>
                        {province.province_state_name}
                    </option>
                ))}
            </select>
            
            <br />

            <label htmlFor="postalCode">Postal Code:</label>
            <input
                type="text"
                name="postalCode"
                id="postalCode"
                value={formValues.postalCode}
                onChange={handleOnChange}
            />
        </div>
    );
};

export default AddressForm;
