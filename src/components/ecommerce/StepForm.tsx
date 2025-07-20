import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { FormStep, FormField } from "../../types/ecommerce";
import { cn } from "../../lib/utils";

const MAX_FILES_PER_FIELD = 3;

interface StepFormProps {
  steps: FormStep[];
  currentStep: number;
  formData: Record<string, any>;
  onUpdateFormData: (stepId: string, data: Record<string, any>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onGoToStep: (stepIndex: number) => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  className?: string;
  visualFiles: File[];
  textFiles: File[];
  otherFiles: File[];
  setVisualFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setTextFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setOtherFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export const StepForm: React.FC<StepFormProps> = ({
  steps,
  currentStep,
  formData,
  onUpdateFormData,
  onNextStep,
  onPrevStep,
  onGoToStep,
  isLastStep,
  isFirstStep,
  className,
  visualFiles,
  textFiles,
  otherFiles,
  setVisualFiles,
  setTextFiles,
  setOtherFiles,
}) => {
  const [currentStepData, setCurrentStepData] = useState<Record<string, any>>(
    {}
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Dropdown state for custom select
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const currentStepInfo = steps[currentStep];

  // Validation des champs
  const validateField = (field: FormField, value: any): string | null => {
    if (field.required && (!value || value.toString().trim() === "")) {
      return `${field.label} est requis`;
    }

    // Suppression de la vérification minLength et maxLength
    if (field.validation) {
      const { pattern } = field.validation;

      if (pattern && value && !new RegExp(pattern).test(value.toString())) {
        return `${field.label} n'est pas valide`;
      }
    }

    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.toString())) {
        return "Email non valide";
      }
    }

    return null;
  };

  // Validation de l'étape courante
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentStepInfo.fields.forEach((field) => {
      // Ignore la validation des champs password et confirmPassword
      if (field.id === "password" || field.id === "confirmPassword") return;
      const value = currentStepData[field.id] || formData[field.id];
      const error = validateField(field, value);

      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Gérer le changement de valeur d'un champ
  const handleFieldChange = (fieldId: string, value: any) => {
    setCurrentStepData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Effacer l'erreur si elle existe
    if (errors[fieldId]) {
      setErrors((prev) => ({
        ...prev,
        [fieldId]: "",
      }));
    }
  };

  // Passer à l'étape suivante
  const handleNext = async () => {
    if (validateCurrentStep()) {
      // Log du contenu du formulaire à chaque étape
      console.log("FormData (étape)", currentStepInfo.id, {
        ...formData,
        ...currentStepData,
      });
      onUpdateFormData(currentStepInfo.id, currentStepData);
      setCurrentStepData({});
      if (isLastStep) {
        // Au lieu de window.location.href, appelle onNextStep (qui sera handleFormCompleted)
        onNextStep();
      } else {
        onNextStep();
      }
    }
  };

  // Revenir à l'étape précédente
  const handlePrev = () => {
    onUpdateFormData(currentStepInfo.id, currentStepData);
    setCurrentStepData({});
    onPrevStep();
  };


  // Rendu d'un champ de formulaire
  const renderField = (field: FormField) => {
    const value = currentStepData[field.id] || formData[field.id] || "";
    const error = errors[field.id];

    const baseInputClasses = cn(
      "w-full px-3 py-2 border-[1px] rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-400",
      error ? "border-red-400" : "border-amber-300/40 focus:border-amber-400/30"
    );

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              className={cn(baseInputClasses, "min-h-[100px] resize-vertical")}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <button
                type="button"
                className={cn(
                  "w-full flex justify-between items-center px-3 py-2 border-[1px] rounded-xl bg-white text-blue-gray900 font-body-m focus:outline-none focus:ring-2 focus:ring-amber-400",
                  error
                    ? "border-red-400"
                    : "border-amber-300/40 focus:border-amber-400/30"
                )}
                onClick={() => setDropdownOpen(field.id)}
              >
                <span>
                  {value
                    ? field.options?.find((o) => o.value === value)?.label
                    : "Sélectionnez une option"}
                </span>
                <svg
                  className="w-4 h-4 text-amber-600 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {dropdownOpen === field.id && (
                <ul className="absolute z-10 mt-2 w-full bg-white border border-amber-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                  <li
                    className="px-4 py-2 text-blue-gray700 cursor-pointer hover:bg-amber-50 rounded-t-xl"
                    onClick={() => {
                      handleFieldChange(field.id, "");
                      setDropdownOpen(null);
                    }}
                  >
                    Sélectionnez une option
                  </li>
                  {field.options?.map((option) => (
                    <li
                      key={option.value}
                      className={cn(
                        "px-4 py-2 cursor-pointer hover:bg-amber-100 text-blue-gray900 font-body-m",
                        value === option.value ? "bg-amber-100 font-bold" : ""
                      )}
                      onClick={() => {
                        handleFieldChange(field.id, option.value);
                        setDropdownOpen(null);
                      }}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-3">
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-amber-200 hover:bg-amber-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={field.id}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                    className="text-amber-600 focus:ring-amber-400"
                  />
                  <span className="text-sm text-blue-gray700 font-body-m">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case "file":
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <p className="text-xs text-blue-gray-600">Jusqu'à {MAX_FILES_PER_FIELD} fichiers.</p>
            <div className="relative w-full">
              <input
                id={`file-input-${field.id}`}
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;
                  const addFiles = (
                    current: File[],
                    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
                  ) => {
                    let updated = [...current, ...files];
                    if (updated.length > MAX_FILES_PER_FIELD) {
                      updated = updated.slice(0, MAX_FILES_PER_FIELD);
                      setErrors((prev) => ({
                        ...prev,
                        [field.id]: `Vous pouvez ajouter au maximum ${MAX_FILES_PER_FIELD} fichiers`,
                      }));
                    } else {
                      setErrors((prev) => ({ ...prev, [field.id]: "" }));
                    }
                    setFiles(updated);
                    handleFieldChange(field.id, updated[0]);
                  };
                  if (field.id === "elements_visuels") {
                    addFiles(visualFiles, setVisualFiles);
                  } else if (field.id === "textes_contenus") {
                    addFiles(textFiles, setTextFiles);
                  } else if (field.id === "autres_fichiers") {
                    addFiles(otherFiles, setOtherFiles);
                  }
                }}
                aria-label={field.label}
                multiple
              />
              <label
                htmlFor={`file-input-${field.id}`}
                className={cn(
                  "w-max flex items-center justify-center gap-2 px-4 py-1 rounded-xl bg-amber-600 text-white font-medium shadow-md cursor-pointer transition hover:bg-amber-700 border border-amber-300",
                  error ? "border-red-400" : "border-amber-300/40"
                )}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 12l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
                <span>Choisir des fichiers</span>
              </label>
            </div>
            {(() => {
              let list: File[] = [];
              if (field.id === "elements_visuels") list = visualFiles;
              else if (field.id === "textes_contenus") list = textFiles;
              else if (field.id === "autres_fichiers") list = otherFiles;
              return list.length ? (
                <ul className="mt-2 list-disc pl-5 text-sm text-blue-gray-700 space-y-1">
                  {list.map((f, idx) => (
                    <li key={idx}>{f.name}</li>
                  ))}
                </ul>
              ) : null;
            })()}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      default:
        // On ne rend plus les champs password et confirmPassword
        if (field.id === "password" || field.id === "confirmPassword")
          return null;
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-blue-gray900 font-body-m">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              className={baseInputClasses}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Indicateur d'étapes */}
      {/* Mobile : numéro d'étape / total, Desktop : boutons étapes */}
      <div className="mb-8">
        {/* Mobile */}
        <div className="flex md:hidden items-center justify-center bg-gradient-to-r from-amber-100 to-blue-gray-100 p-4 rounded-xl font-bold text-blue-gray900 text-lg">
          Étape {currentStep + 1} / {steps.length}
        </div>
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center space-x-4 bg-gradient-to-r from-amber-100 to-blue-gray-100 p-6 rounded-xl">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <button
                onClick={() => onGoToStep(index)}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 shadow-md",
                  index === currentStep
                    ? "bg-amber-600 text-white scale-110"
                    : step.isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-white text-gray-600 border-2 border-amber-200"
                )}
              >
                {step.isCompleted ? <CheckIcon className="w-5 h-5" /> : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className="w-12 h-1 bg-amber-200 mx-2 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire de l'étape courante */}
      <Card className="overflow-hidden">
        <CardHeader className="p-8">
          <h2 className="text-2xl font-bold text-blue-gray900 font-heading-2">
            {currentStepInfo.title}
          </h2>
          {currentStepInfo.description && (
            <p className="text-blue-gray600 font-body-l mt-2">
              {currentStepInfo.description}
            </p>
          )}
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          {currentStepInfo.fields.map(renderField)}

          {/* Boutons de navigation */}
          <div className="flex justify-between pt-8 border-t border-amber-200">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={isFirstStep}
              className="flex items-center gap-2 border-amber-300 text-amber-900 hover:bg-amber-50"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              Précédent
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl shadow-md"
            >
              {isLastStep ? "Terminer" : "Suivant"}
              {!isLastStep && <ChevronRightIcon className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
