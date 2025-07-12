import React from 'react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({ currentStep, totalSteps, onNext, onPrevious }) => {
  return (
    <div className="flex justify-between mt-4">
      {currentStep > 0 && (
        <button
          type="button"
          onClick={onPrevious}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Previous
        </button>
      )}
      {currentStep < totalSteps - 1 ? (
        <button
          type="button"
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      ) : (
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Submit
        </button>
      )}
    </div>
  );
};