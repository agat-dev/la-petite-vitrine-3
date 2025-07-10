import React from 'react';

const CommunicationStep = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Communication Preferences</h2>
      <div>
        <label>
          Desired Tone for Communication:
          <select name="desiredTone" onChange={handleChange} value={formData.desiredTone}>
            <option value="">Select...</option>
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default CommunicationStep;