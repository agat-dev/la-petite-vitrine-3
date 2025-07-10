import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  canProceed?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting = false,
  canProceed = true
}) => {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
          isFirstStep
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-700 hover:border-amber-300 hover:text-amber-700"
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Précédent
      </button>

      <div className="text-sm text-gray-500">
        Étape {currentStep + 1} sur {totalSteps}
      </div>

      {isLastStep ? (
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || !canProceed}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
            isSubmitting || !canProceed
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-amber-600 text-white hover:bg-amber-700"
          }`}
        >
          {isSubmitting ? 'Envoi...' : 'Envoyer'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            !canProceed
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-amber-600 text-amber-600 hover:bg-amber-50"
          }`}
        >
          Suivant
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};