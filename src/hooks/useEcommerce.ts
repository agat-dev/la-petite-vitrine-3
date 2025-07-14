import { useState, useEffect } from 'react';
import { Pack, MaintenanceOption, StepFormData, OrderData, Customer } from '../types/ecommerce';
import { DEFAULT_FORM_STEPS } from '../data/ecommerce-data';

export const useEcommerce = () => {
  // Transforme les données du formulaire en objet compatible Supabase (order_forms)
  // Ajout du paramètre orderId pour rattacher le formulaire à la commande
  const mapFormDataToOrderForm = (formData: Record<string, any>, stepFormData: StepFormData, orderId?: string) => {
    return {
      orderId: orderId || formData.orderId || null,
      firstName: formData.prenom || '',
      lastName: formData.nom || '',
      email: formData.mail || '',
      phone: formData.telephone || '',
      company: formData.entreprise || '',
      street: formData.street || '',
      city: formData.city || '',
      postalCode: formData.postalCode || '',
      country: formData.country || '',
      packId: stepFormData.selectedPack?.id || null,
      packTitle: stepFormData.selectedPack?.title || '',
      packDescription: stepFormData.selectedPack?.description || '',
      packFeatures: stepFormData.selectedPack?.features || [],
      packDeliverytime: stepFormData.selectedPack?.deliveryTime || '',
      maintenanceId: stepFormData.selectedMaintenance?.id || null,
      maintenanceTitle: stepFormData.selectedMaintenance?.title || '',
      maintenanceDescription: stepFormData.selectedMaintenance?.description || '',
      maintenanceFeatures: stepFormData.selectedMaintenance?.features || [],
      maintenanceBillingCycle: stepFormData.selectedMaintenance?.billingCycle || '',
      socialOptions: stepFormData.selectedSocialOptions?.map(opt => opt.label) || [],
      additionalInfo: formData.additionalInfo || '',
      budget: formData.budget || '',
      objectif: formData.objectif || '',
      delai: formData.delai || '',
      referenceUrl: formData.referenceUrl || '',
      description: formData.description || '',
      color: formData.color || '',
      logoUrl: formData.logoUrl || '',
      imageUrl: formData.imageUrl || '',
      domain: formData.domain || '',
      cms: formData.cms || '',
      hebergement: formData.hebergement || '',
      paiement: formData.paiement || '',
      livraison: formData.livraison || '',
      produit: formData.produit || '',
      service: formData.service || '',
      autre: formData.autre || '',
      besoin: formData.besoin || '',
      fonctionnalite: formData.fonctionnalite || '',
      rgpdAccepted: formData.rgpdAccepted || false,
      status: 'en cours de validation',
      createdAt: new Date().toISOString()
    };
  };
  const [stepFormData, setStepFormData] = useState<StepFormData>({
    currentStep: 0,
    steps: DEFAULT_FORM_STEPS,
    formData: {},
    selectedPack: undefined,
    selectedMaintenance: undefined,
    selectedSocialOptions: []
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
  const selectMaintenance = (maintenance: MaintenanceOption) => {
    console.log('Selecting maintenance:', maintenance);
    setStepFormData(prev => ({
      ...prev,
      selectedMaintenance: maintenance
    }));
  };
  // Sélectionner une maintenance
  const selectSocialOptions = (options: MaintenanceOption[]) => {
    console.log('Selecting social options:', options);
    setStepFormData(prev => ({
      ...prev,
      selectedSocialOptions: options
    }));
  };

  // Mettre à jour les données du formulaire
  const updateFormData = (stepId: string, fieldData: Record<string, any>) => {
    setStepFormData(prev => {
      const updatedFormData = {
        ...prev.formData,
        ...fieldData
      };
      // Stockage local des données du formulaire à chaque mise à jour
      localStorage.setItem('formData', JSON.stringify(updatedFormData));
      return {
        ...prev,
        formData: updatedFormData,
        steps: prev.steps.map(step => 
          step.id === stepId 
            ? { ...step, isCompleted: true }
            : step
        )
      };
    });
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
    // La maintenance est facturée séparément (mensuelle)
    return packPrice;
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
      updatedAt: new Date(),
      customerId: customer?.id || null // Ajout du rattachement au customer
    };

    // Sauvegarder la commande dans le localStorage global
    const existingOrders = JSON.parse(localStorage.getItem('all_orders') || '[]');
    const newOrders = [...existingOrders, order];
    localStorage.setItem('all_orders', JSON.stringify(newOrders));
    // Mettre à jour l'état local
    setOrders(newOrders);
    return order;
  };

  // Soumission complète : crée la commande puis le formulaire lié
  const submitOrderAndForm = async () => {
    // 1. Création de la commande (order)
    const orderPayload = {
      customerId: customer?.id || null,
      packId: stepFormData.selectedPack?.id || null,
      maintenanceId: stepFormData.selectedMaintenance?.id || null,
      formData: stepFormData.formData,
      totalPrice: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    const orderRes = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    const orderData = await orderRes.json();
    if (!orderData.id) throw new Error('Erreur création commande');

    // 2. Conversion des données du formulaire pour correspondre à la table order_forms
    const orderFormPayload = mapFormDataToOrderForm(
      stepFormData.formData,
      stepFormData,
      orderData.id
    );
    // Conversion des champs ARRAY en format compatible Supabase (ex: JSON.stringify)
    (orderFormPayload as any).packFeatures = JSON.stringify(orderFormPayload.packFeatures);
    (orderFormPayload as any).maintenanceFeatures = JSON.stringify(orderFormPayload.maintenanceFeatures);
    (orderFormPayload as any).socialOptions = JSON.stringify(orderFormPayload.socialOptions);

    const formRes = await fetch('/api/order_form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderFormPayload)
    });
    const formDataRes = await formRes.json();
    if (!formDataRes.id) throw new Error('Erreur création order_form');

    // 3. Mise à jour locale
    setOrders(prev => [...prev, orderData]);
    localStorage.setItem('orders', JSON.stringify([...orders, orderData]));

    return { order: orderData, orderForm: formDataRes };
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setStepFormData({
      currentStep: 0,
      steps: DEFAULT_FORM_STEPS.map(step => ({ ...step, isCompleted: false })),
      formData: {},
      selectedPack: undefined,
      selectedMaintenance: undefined,
      selectedSocialOptions: []
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
  const resetCustomerSession = () => {
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
    selectSocialOptions,
    updateFormData,
    goToStep,
    nextStep,
    prevStep,
    calculateTotal,
    createOrder,
    resetForm,
    loginCustomer,
    resetCustomerSession,
    submitOrderAndForm,
    
    // Utilitaires
    isFormValid: stepFormData.steps.every(step => step.isCompleted) && stepFormData.selectedPack && stepFormData.selectedMaintenance,
    currentStep: stepFormData.steps[stepFormData.currentStep],
    isLastStep: stepFormData.currentStep === stepFormData.steps.length - 1,
    isFirstStep: stepFormData.currentStep === 0
  };
};