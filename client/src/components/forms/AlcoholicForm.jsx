

import React, { useState, useEffect } from 'react';

const AlcoholiclForm = ({ allAlch, formValues, setFormValues }) => {
    const [alchOptions, setAlchOptions] = useState([
        {}
    ]);

    useEffect(() => {
        setFormValues({
            ...formValues,
            emailRows
        });
    }, [emailRows]);

    const handleOnChange = (event) => {
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };
  


   
    return (
        <div>
          
        </div>
    );
};

export default AlcoholiclForm;
