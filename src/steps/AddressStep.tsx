import React from 'react';

const AddressStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Address Information</h2>
      <label>
        Full Address:
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Area of Intervention:
        <input
          type="text"
          name="areaOfIntervention"
          value={formData.areaOfIntervention}
          onChange={handleChange}
          required
        />
      </label>
    </div>
  );
};

export default AddressStep;