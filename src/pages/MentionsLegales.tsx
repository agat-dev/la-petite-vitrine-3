import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../components/ui/card';

export const MentionsLegalesPage = (): JSX.Element => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-blue-gray900 text-white py-6 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-blue-gray200 hover:text-white transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-2xl md:text-3xl font-heading-2 text-white">
            Mentions Légales
          </h1>
          <p className="text-blue-gray200 font-body-m mt-2">
            Dernière mise à jour : 8 janvier 2025
          </p>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="py-12 px-4 md:px-8 lg:px-20">
        <div className="max-w-[1000px] mx-auto">
          <Card className="bg-white border-amber-200/50 shadow-lg">
            <CardContent className="p-8 md:p-12 space-y-8">
              
              {/* Section 1 - Identification de l'entreprise */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  1. Identification de l'entreprise
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p><strong>Raison sociale :</strong> Next Impact</p>
                    <p><strong>Projet :</strong> La Petite Vitrine</p>
                    <p><strong>Forme juridique :</strong> Entreprise individuelle</p>
                    <p><strong>Siège social :</strong> 4 rue du Centre, 15400 Trizac, France</p>
                    <p><strong>SIRET :</strong> 532 675 386 00066</p>
                    <p><strong>Code APE :</strong> 6201Z (Programmation informatique)</p>
                  </div>
                  <p>
                    <strong>Dirigeant :</strong> Agathe Martin
                  </p>
                  <p>
                    <strong>Email :</strong> <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a>
                  </p>
                  <p>
                    <strong>Téléphone :</strong> <a href="tel:0673981638" className="text-amber-700 hover:text-amber-900">06 73 98 16 38</a>
                  </p>
                </div>
              </section>

              {/* Section 2 - Directeur de publication */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  2. Directeur de publication
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>Directeur de publication :</strong> Agathe Martin
                  </p>
                  <p>
                    <strong>Qualité :</strong> Dirigeante de Next Impact
                  </p>
                  <p>
                    <strong>Contact :</strong> <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a>
                  </p>
                </div>
              </section>

              {/* Section 3 - Hébergement */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  3. Hébergement du site
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <div className="bg-blue-gray50 p-4 rounded-lg">
                    <p><strong>Hébergeur :</strong> Vercel Inc</p>
                    <p><strong>Adresse :</strong> 650 California St, San Francisco, CA 94108, États-Unis</p>
                    <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900">vercel.com</a></p>
                  </div>
                  <p>
                    Vercel Inc est une société américaine spécialisée dans l'hébergement de sites web et d'applications. L'hébergement est conforme aux standards internationaux de sécurité et de performance.
                  </p>
                </div>
              </section>

              {/* Section 4 - Propriété intellectuelle */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  4. Propriété intellectuelle
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>4.1 Droits d'auteur :</strong> L'ensemble du contenu du site La Petite Vitrine (textes, images, graphismes, logo, icônes, sons, logiciels) est protégé par le droit d'auteur et appartient à Next Impact ou à ses partenaires.
                  </p>
                  <p>
                    <strong>4.2 Marques :</strong> Les marques "La Petite Vitrine" et "Next Impact" ainsi que tous les logos associés sont des marques déposées ou en cours de dépôt de Next Impact.
                  </p>
                  <p>
                    <strong>4.3 Utilisation :</strong> Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Next Impact.
                  </p>
                  <p>
                    <strong>4.4 Liens hypertextes :</strong> La mise en place de liens hypertextes vers le site La Petite Vitrine nécessite l'autorisation écrite préalable de Next Impact.
                  </p>
                </div>
              </section>

              {/* Section 5 - Protection des données personnelles */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  5. Protection des données personnelles
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>5.1 Responsable de traitement :</strong> Next Impact, représentée par Agathe Martin, est responsable du traitement des données personnelles collectées sur ce site.
                  </p>
                  <p>
                    <strong>5.2 Données collectées :</strong> Les données collectées incluent :
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Données d'identification (nom, prénom, email, téléphone)</li>
                    <li>Données de navigation (cookies, adresse IP, pages visitées)</li>
                    <li>Données de commande (services sélectionnés, paiements)</li>
                    <li>Données de communication (messages, demandes de contact)</li>
                  </ul>
                  <p>
                    <strong>5.3 Finalités du traitement :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Exécution des services commandés</li>
                    <li>Gestion de la relation client</li>
                    <li>Amélioration de nos services</li>
                    <li>Respect des obligations légales</li>
                  </ul>
                  <p>
                    <strong>5.4 Vos droits :</strong> Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de limitation du traitement, de portabilité et d'opposition concernant vos données personnelles.
                  </p>
                  <p>
                    <strong>5.5 Contact :</strong> Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a>
                  </p>
                </div>
              </section>

              {/* Section 6 - Cookies */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  6. Cookies et technologies similaires
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>6.1 Définition :</strong> Les cookies sont des fichiers texte déposés sur votre terminal lors de la consultation du site.
                  </p>
                  <p>
                    <strong>6.2 Types de cookies utilisés :</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Cookies techniques :</strong> Nécessaires au fonctionnement du site</li>
                    <li><strong>Cookies de mesure d'audience :</strong> Statistiques de fréquentation anonymisées</li>
                    <li><strong>Cookies de personnalisation :</strong> Préférences utilisateur</li>
                  </ul>
                  <p>
                    <strong>6.3 Gestion des cookies :</strong> Vous pouvez gérer vos préférences cookies via les paramètres de votre navigateur ou notre interface de gestion des cookies.
                  </p>
                  <p>
                    <strong>6.4 Durée de conservation :</strong> Les cookies sont conservés pour une durée maximale de 13 mois.
                  </p>
                </div>
              </section>

              {/* Section 7 - Responsabilité */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  7. Responsabilité
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>7.1 Contenu du site :</strong> Next Impact s'efforce de fournir des informations exactes et à jour. Cependant, des erreurs ou omissions peuvent survenir.
                  </p>
                  <p>
                    <strong>7.2 Disponibilité :</strong> Next Impact ne peut garantir l'accès continu au site et ne saurait être tenue responsable des interruptions de service.
                  </p>
                  <p>
                    <strong>7.3 Liens externes :</strong> Le site peut contenir des liens vers des sites tiers. Next Impact n'est pas responsable du contenu de ces sites.
                  </p>
                  <p>
                    <strong>7.4 Utilisation :</strong> L'utilisateur est seul responsable de l'utilisation qu'il fait du site et des dommages qu'il pourrait causer.
                  </p>
                </div>
              </section>

              {/* Section 8 - Droit applicable */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  8. Droit applicable et juridiction
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>8.1 Loi applicable :</strong> Les présentes mentions légales sont régies par le droit français.
                  </p>
                  <p>
                    <strong>8.2 Juridiction :</strong> En cas de litige, et après tentative de résolution amiable, les tribunaux français sont seuls compétents.
                  </p>
                  <p>
                    <strong>8.3 Médiation :</strong> Conformément à la réglementation en vigueur, nous adhérons à un service de médiation de la consommation.
                  </p>
                </div>
              </section>

              {/* Section 9 - Modifications */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  9. Modifications des mentions légales
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Next Impact se réserve le droit de modifier les présentes mentions légales à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.
                  </p>
                  <p>
                    Il est conseillé de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
                  </p>
                </div>
              </section>

              {/* Section 10 - Contact */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  10. Contact
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Pour toute question concernant ces mentions légales ou le site en général, vous pouvez nous contacter :
                  </p>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p><strong>Email :</strong> <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a></p>
                    <p><strong>Téléphone :</strong> <a href="tel:0673981638" className="text-amber-700 hover:text-amber-900">06 73 98 16 38</a></p>
                    <p><strong>Adresse :</strong> 4 rue du Centre, 15400 Trizac, France</p>
                  </div>
                  <p>
                    <strong>Horaires d'ouverture :</strong> Du lundi au vendredi de 9h à 18h
                  </p>
                </div>
              </section>

              {/* Section 11 - Crédits */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  11. Crédits
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    <strong>Conception et développement :</strong> Next Impact
                  </p>
                  <p>
                    <strong>Technologies utilisées :</strong> React, TypeScript, Tailwind CSS
                  </p>
                  <p>
                    <strong>Hébergement :</strong> Vercel Inc
                  </p>
                  <p>
                    <strong>Paiements :</strong> Stripe Inc
                  </p>
                  <p>
                    <strong>Icônes :</strong> Heroicons by Tailwind Labs
                  </p>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-amber-200">
                <p className="text-blue-gray600 font-body-m">
                  Ces mentions légales ont été mises à jour le 8 janvier 2025.
                </p>
                <p className="text-blue-gray600 font-body-m mt-2">
                  Pour toute question, contactez-nous à : 
                  <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900 ml-1">
                    contact@lapetitevitrine.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MentionsLegalesPage;