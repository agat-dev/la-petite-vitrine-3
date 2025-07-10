import React from 'react';

const CompanyInfoStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Company Information</h2>
      <label>
        Company Name:
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
        />
      </label>
      <label>
        Industry:
        <input
          type="text"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        />
      </label>
      <div>
        <button type="button" onClick={prevStep}>Previous</button>
        <button type="button" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default CompanyInfoStep;