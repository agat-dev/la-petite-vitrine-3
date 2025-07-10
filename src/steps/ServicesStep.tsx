import React from 'react';

const ServicesStep = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Services Information</h2>
      <div>
        <label>
          Proposed Services:
          <input
            type="text"
            name="proposedServices"
            value={formData.proposedServices}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Specificity/Positioning:
          <input
            type="text"
            name="specificity"
            value={formData.specificity}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Main Competitors:
          <input
            type="text"
            name="mainCompetitors"
            value={formData.mainCompetitors}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Types of Clients:
          <select
            name="typesOfClients"
            value={formData.typesOfClients}
            onChange={handleChange}
          >
            <option value="individuals">Individuals</option>
            <option value="professionals">Professionals</option>
          </select>
        </label>
      </div>
      <div>
        <button type="button" onClick={prevStep}>
          Previous
        </button>
        <button type="button" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ServicesStep;