import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`w-8 h-8 rounded-full border-2 ${
            index + 1 === currentStep ? 'bg-blue-500 border-blue-500' : 'bg-gray-200 border-gray-300'
          }`}
        />
      ))}
    </div>
  );
};