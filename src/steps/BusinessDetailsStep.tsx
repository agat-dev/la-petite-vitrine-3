import React from 'react';

const BusinessDetailsStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Business Details</h2>
      <div>
        <label>Main Competitors:</label>
        <input
          type="text"
          name="mainCompetitors"
          value={formData.mainCompetitors}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Proposed Services:</label>
        <input
          type="text"
          name="proposedServices"
          value={formData.proposedServices}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Specificity/Positioning:</label>
        <input
          type="text"
          name="specificityPositioning"
          value={formData.specificityPositioning}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Types of Clients:</label>
        <select
          name="typesOfClients"
          value={formData.typesOfClients}
          onChange={handleChange}
        >
          <option value="individuals">Individuals</option>
          <option value="professionals">Professionals</option>
        </select>
      </div>
      <div>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="button" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;