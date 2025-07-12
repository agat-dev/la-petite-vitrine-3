import React from 'react';
import { CheckIcon } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
  onStepClick: (step: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
  onStepClick
}) => {
  return (
    <div className="w-full py-4"> 
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 cursor-pointer transition-colors ${
                index <= currentStep
                  ? "bg-amber-600 border-amber-600 text-white"
                  : "border-gray-300 text-gray-400 hover:border-amber-300"
              }`}
              onClick={() => onStepClick(index)}
            >
              {index < currentStep ? (
                <CheckIcon className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <div className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
              {title}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 mx-4 transition-colors ${
                  index < currentStep ? "bg-amber-600" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};