import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings, Cookie } from 'lucide-react';
import { Card, CardContent } from './card';

interface CookieBannerProps {
  className?: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    personalization: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consent = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    // Here you would typically initialize tracking scripts
    console.log('All cookies accepted:', consent);
  };

  const handleAcceptSelected = () => {
    const consent = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    // Here you would typically initialize only selected tracking scripts
    console.log('Selected cookies accepted:', consent);
  };

  const handleRejectAll = () => {
    const consent = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    console.log('Only essential cookies accepted:', consent);
  };

  const handleClose = () => {
    setIsVisible(false);
    // If user closes without choosing, we assume reject all
    handleRejectAll();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Cannot disable essential cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const bannerVariants = {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      y: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const settingsVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed bottom-4 left-4 right-4 z-50 max-w-2xl mx-auto ${className}`}
        >
          <Card className="bg-white border-amber-200 shadow-shadow-dark-XL backdrop-blur-md">
            <CardContent className="p-4 md:p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Cookie className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-heading-4 text-blue-gray900">
                    Gestion des cookies
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-amber-50 rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4 text-blue-gray600" />
                </button>
              </div>

              {/* Main content */}
              <div className="space-y-4">
                <p className="text-sm text-blue-gray700 font-body-m">
                  Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                  Vous pouvez accepter tous les cookies ou personnaliser vos préférences.
                </p>

                <p className="text-xs text-blue-gray600">
                  Pour plus d'informations, consultez notre{' '}
                  <a 
                    href="/politique-confidentialite" 
                    className="text-amber-700 hover:text-amber-900 underline"
                  >
                    politique de confidentialité
                  </a>.
                </p>

                {/* Settings panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      variants={settingsVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="border-t border-amber-200 pt-4"
                    >
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-blue-gray900">
                          Préférences des cookies
                        </h4>
                        
                        {/* Essential cookies */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-blue-gray900">
                              Cookies essentiels
                            </label>
                            <p className="text-xs text-blue-gray600 mt-1">
                              Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.
                            </p>
                          </div>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              checked={preferences.essential}
                              disabled
                              className="w-4 h-4 text-amber-600 bg-amber-100 border-amber-300 rounded focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {/* Analytics cookies */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-blue-gray900">
                              Cookies d'analyse
                            </label>
                            <p className="text-xs text-blue-gray600 mt-1">
                              Nous aident à comprendre comment vous utilisez le site.
                            </p>
                          </div>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              checked={preferences.analytics}
                              onChange={() => handlePreferenceChange('analytics')}
                              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {/* Marketing cookies */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-blue-gray900">
                              Cookies marketing
                            </label>
                            <p className="text-xs text-blue-gray600 mt-1">
                              Utilisés pour afficher des publicités pertinentes.
                            </p>
                          </div>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              checked={preferences.marketing}
                              onChange={() => handlePreferenceChange('marketing')}
                              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {/* Personalization cookies */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <label className="text-sm font-medium text-blue-gray900">
                              Cookies de personnalisation
                            </label>
                            <p className="text-xs text-blue-gray600 mt-1">
                              Permettent une expérience personnalisée.
                            </p>
                          </div>
                          <div className="ml-4">
                            <input
                              type="checkbox"
                              checked={preferences.personalization}
                              onChange={() => handlePreferenceChange('personalization')}
                              className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Accepter tout
                  </button>
                  
                  <button
                    onClick={toggleSettings}
                    className="flex-1 bg-blue-gray100 hover:bg-blue-gray200 text-blue-gray900 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Personnaliser
                  </button>
                  
                  {showSettings && (
                    <button
                      onClick={handleAcceptSelected}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Enregistrer
                    </button>
                  )}
                  
                  <button
                    onClick={handleRejectAll}
                    className="flex-1 bg-transparent hover:bg-blue-gray50 text-blue-gray700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-gray200"
                  >
                    Refuser tout
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;