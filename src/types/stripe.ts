export interface Pack {
  id: string;
  icon: string;
  title: string;
  price: string;
  maintenance: string;
  features: string[];
  buttonText: string;
  isRecommended: boolean;
  bgColor: string;
  textColor: string;
  priceColor: string;
  buttonVariant: 'primary' | 'secondary';
}

export interface MaintenanceService {
  id: string;
  icon: string;
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  priceColor: string;
  textColor: string;
  checkColor: string;
  buttonClass: string;
}

export interface CartItem {
  type: 'pack' | 'maintenance';
  item: Pack | MaintenanceService;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
  mode?: string;
  amount?: string;
}