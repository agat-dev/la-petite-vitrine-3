import { useState, useEffect } from 'react';
import { Pack, MaintenanceOption, StepFormData, OrderData, Customer } from '../types/ecommerce';
import { DEFAULT_FORM_STEPS } from '../data/ecommerce-data';

export const useEcommerce = () => {
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    currentStep: 0,
    steps: DEFAULT_FORM_STEPS,
    formData: {},
    selectedPack: undefined,
    selectedMaintenance: undefined
  });

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedCustomer = localStorage.getItem('customer');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Sauvegarder les données dans localStorage
  const saveToStorage = (customerData: Customer, ordersData: OrderData[]) => {
    localStorage.setItem('customer', JSON.stringify(customerData));
    localStorage.setItem('orders', JSON.stringify(ordersData));
  };

  // Sélectionner un pack
  const selectPack = (pack: Pack) => {
    console.log('Selecting pack:', pack);
    setStepFormData(prev => ({
      ...prev,
      selectedPack: pack
    }));
  };

  // Sélectionner une maintenance
  const selectMaintenance = (maintenance: MaintenanceOption | undefined) => {
    console.log('Selecting maintenance:', maintenance);
    setStepFormData(prev => ({
      ...prev,
      selectedMaintenance: maintenance
    }));
  };

  // Mettre à jour les données du formulaire
  const updateFormData = (stepId: string, fieldData: Record<string, any>) => {
    setStepFormData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        ...fieldData
      },
      steps: prev.steps.map(step => 
        step.id === stepId 
          ? { ...step, isCompleted: true }
          : step
      )
    }));
  };

  // Naviguer entre les étapes
  const goToStep = (stepIndex: number) => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: stepIndex
    }));
  };

  const nextStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.steps.length - 1)
    }));
  };

  const prevStep = () => {
    setStepFormData(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  };

  // Calculer le prix total
  const calculateTotal = () => {
    const packPrice = stepFormData.selectedPack?.price || 0;
    const maintenancePrice = stepFormData.selectedMaintenance?.price || 0;
    return packPrice + maintenancePrice;
  };

  // Créer une commande
  const createOrder = async (): Promise<OrderData> => {
    if (!stepFormData.selectedPack) {
      throw new Error('Aucun pack sélectionné');
    }

    const order: OrderData = {
      pack: stepFormData.selectedPack,
      maintenance: stepFormData.selectedMaintenance,
      formData: stepFormData.formData,
      totalPrice: calculateTotal(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Créer ou mettre à jour le client
    const customerData: Customer = customer || {
      id: Date.now().toString(),
      email: stepFormData.formData.email,
      firstName: stepFormData.formData.firstName,
      lastName: stepFormData.formData.lastName,
      company: stepFormData.formData.company,
      phone: stepFormData.formData.phone,
      createdAt: new Date(),
      orders: []
    };

    customerData.orders.push(order);
    const updatedOrders = [...orders, order];

    setCustomer(customerData);
    setOrders(updatedOrders);
    saveToStorage(customerData, updatedOrders);

    return order;
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setStepFormData({
      currentStep: 0,
      steps: DEFAULT_FORM_STEPS.map(step => ({ ...step, isCompleted: false })),
      formData: {},
      selectedPack: undefined,
      selectedMaintenance: undefined
    });
  };

  // Connexion client
  const loginCustomer = (email: string) => {
    // Simulation de connexion - en production, cela ferait appel à une API
    const savedCustomer = localStorage.getItem('customer');
    if (savedCustomer) {
      const customerData = JSON.parse(savedCustomer);
      if (customerData.email === email) {
        setCustomer(customerData);
        return true;
      }
    }
    return false;
  };

  // Déconnexion
  const logout = () => {
    setCustomer(null);
  };

  return {
    // État
    stepFormData,
    customer,
    orders,
    
    // Actions
    selectPack,
    selectMaintenance,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    resetForm,
    loginCustomer,
    logout,
    
    // Utilitaires
    isFormValid: stepFormData.steps.every(step => step.isCompleted) && stepFormData.selectedPack,
    currentStep: stepFormData.steps[stepFormData.currentStep],
    isLastStep: stepFormData.currentStep === stepFormData.steps.length - 1,
    isFirstStep: stepFormData.currentStep === 0
  };
};