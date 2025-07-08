import { useState, useEffect } from 'react';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
  timestamp?: string;
}

export const useCookies = () => {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null);
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('cookieConsent');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        setHasConsent(true);
      } catch (error) {
        console.error('Error parsing cookie preferences:', error);
        localStorage.removeItem('cookieConsent');
      }
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    const preferencesWithTimestamp = {
      ...newPreferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(preferencesWithTimestamp));
    setPreferences(preferencesWithTimestamp);
    setHasConsent(true);
  };

  const clearPreferences = () => {
    localStorage.removeItem('cookieConsent');
    setPreferences(null);
    setHasConsent(false);
  };

  const canUseAnalytics = () => {
    return preferences?.analytics ?? false;
  };

  const canUseMarketing = () => {
    return preferences?.marketing ?? false;
  };

  const canUsePersonalization = () => {
    return preferences?.personalization ?? false;
  };

  return {
    preferences,
    hasConsent,
    updatePreferences,
    clearPreferences,
    canUseAnalytics,
    canUseMarketing,
    canUsePersonalization,
  };
};