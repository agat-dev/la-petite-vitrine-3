import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from '../components/ui/card';

export const PolitiqueConfidentialitePage = (): JSX.Element => {
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
            Politique de Confidentialité
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
              
              {/* Introduction */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  Introduction
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Next Impact, exploitant le service "La Petite Vitrine", s'engage à protéger la vie privée de ses utilisateurs et à respecter la réglementation en vigueur en matière de protection des données personnelles, notamment le Règlement Général sur la Protection des Données (RGPD) et la loi Informatique et Libertés.
                  </p>
                  <p>
                    Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos données personnelles lorsque vous utilisez notre site web et nos services.
                  </p>
                </div>
              </section>

              {/* Section 1 - Responsable du traitement */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  1. Responsable du traitement des données
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <p><strong>Responsable du traitement :</strong> Next Impact</p>
                    <p><strong>Projet :</strong> La Petite Vitrine</p>
                    <p><strong>Dirigeante :</strong> Agathe Martin</p>
                    <p><strong>Adresse :</strong> 4 rue du Centre, 15400 Trizac, France</p>
                    <p><strong>Email :</strong> <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a></p>
                    <p><strong>Téléphone :</strong> <a href="tel:0673981638" className="text-amber-700 hover:text-amber-900">06 73 98 16 38</a></p>
                  </div>
                </div>
              </section>

              {/* Section 2 - Données collectées */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  2. Données personnelles collectées
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Nous collectons différents types de données personnelles selon votre utilisation de nos services :
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">2.1 Données d'identification</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Nom et prénom</li>
                        <li>Adresse email</li>
                        <li>Numéro de téléphone</li>
                        <li>Nom de l'entreprise</li>
                        <li>Adresse postale</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">2.2 Données de navigation</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Adresse IP</li>
                        <li>Type de navigateur et version</li>
                        <li>Système d'exploitation</li>
                        <li>Pages visitées et durée de visite</li>
                        <li>Données de géolocalisation (approximative)</li>
                        <li>Cookies et technologies similaires</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">2.3 Données de commande</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Services sélectionnés</li>
                        <li>Informations de paiement (cryptées)</li>
                        <li>Historique des commandes</li>
                        <li>Factures et reçus</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">2.4 Données de communication</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Messages envoyés via formulaires de contact</li>
                        <li>Échanges par email</li>
                        <li>Conversations téléphoniques (si enregistrées)</li>
                        <li>Feedback et avis clients</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 - Finalités du traitement */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  3. Finalités du traitement et bases légales
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Nous traitons vos données personnelles pour les finalités suivantes :
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-gray50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">3.1 Exécution du contrat</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Traitement des commandes</li>
                        <li>Création et livraison des sites web</li>
                        <li>Services de maintenance</li>
                        <li>Gestion des paiements</li>
                        <li>Support client</li>
                      </ul>
                      <p className="mt-2 text-sm italic">Base légale : Exécution du contrat</p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">3.2 Intérêts légitimes</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Amélioration de nos services</li>
                        <li>Sécurité du site web</li>
                        <li>Analyses statistiques</li>
                        <li>Prévention de la fraude</li>
                        <li>Communication commerciale (clients existants)</li>
                      </ul>
                      <p className="mt-2 text-sm italic">Base légale : Intérêts légitimes</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">3.3 Consentement</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Newsletter et communications marketing</li>
                        <li>Cookies non essentiels</li>
                        <li>Témoignages et avis clients</li>
                        <li>Prospection commerciale (prospects)</li>
                      </ul>
                      <p className="mt-2 text-sm italic">Base légale : Consentement</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">3.4 Obligations légales</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Conservation des factures</li>
                        <li>Déclarations fiscales</li>
                        <li>Réponse aux demandes des autorités</li>
                        <li>Respect des réglementations</li>
                      </ul>
                      <p className="mt-2 text-sm italic">Base légale : Obligation légale</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 - Durée de conservation */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  4. Durée de conservation des données
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Les données personnelles sont conservées pendant des durées différentes selon leur nature :
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-amber-200 bg-white rounded-lg">
                      <thead>
                        <tr className="bg-amber-50">
                          <th className="border border-amber-200 p-3 text-left font-semibold">Type de données</th>
                          <th className="border border-amber-200 p-3 text-left font-semibold">Durée de conservation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-amber-200 p-3">Données clients actifs</td>
                          <td className="border border-amber-200 p-3">Durée de la relation contractuelle + 3 ans</td>
                        </tr>
                        <tr>
                          <td className="border border-amber-200 p-3">Données de prospects</td>
                          <td className="border border-amber-200 p-3">3 ans à compter du dernier contact</td>
                        </tr>
                        <tr>
                          <td className="border border-amber-200 p-3">Données de facturation</td>
                          <td className="border border-amber-200 p-3">10 ans (obligation légale)</td>
                        </tr>
                        <tr>
                          <td className="border border-amber-200 p-3">Données de navigation</td>
                          <td className="border border-amber-200 p-3">13 mois maximum</td>
                        </tr>
                        <tr>
                          <td className="border border-amber-200 p-3">Cookies</td>
                          <td className="border border-amber-200 p-3">13 mois maximum</td>
                        </tr>
                        <tr>
                          <td className="border border-amber-200 p-3">Logs de sécurité</td>
                          <td className="border border-amber-200 p-3">1 an</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* Section 5 - Partage des données */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  5. Partage et transfert des données
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Vos données personnelles peuvent être partagées avec les tiers suivants :
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">5.1 Prestataires de services</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><strong>Vercel Inc</strong> (hébergement web) - États-Unis</li>
                        <li><strong>Stripe Inc</strong> (paiements) - États-Unis</li>
                        <li><strong>Services de maintenance</strong> (si externalisés)</li>
                        <li><strong>Outils d'analyse</strong> (si utilisés)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">5.2 Transferts internationaux</h3>
                      <p>
                        Certains de nos prestataires sont situés en dehors de l'Union Européenne. Ces transferts sont encadrés par :
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Clauses contractuelles types approuvées par la Commission Européenne</li>
                        <li>Décisions d'adéquation de la Commission Européenne</li>
                        <li>Certifications et codes de conduite appropriés</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">5.3 Autorités légales</h3>
                      <p>
                        Nous pouvons être amenés à communiquer vos données aux autorités compétentes dans le cadre de nos obligations légales ou sur réquisition judiciaire.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6 - Vos droits */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  6. Vos droits sur vos données personnelles
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Conformément au RGPD, vous disposez des droits suivants :
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-gray50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">🔍 Droit d'accès</h3>
                      <p>Vous pouvez demander l'accès à vos données personnelles et obtenir des informations sur leur traitement.</p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">✏️ Droit de rectification</h3>
                      <p>Vous pouvez demander la correction de vos données personnelles inexactes ou incomplètes.</p>
                    </div>

                    <div className="bg-red-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">🗑️ Droit d'effacement</h3>
                      <p>Vous pouvez demander la suppression de vos données personnelles dans certaines conditions.</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">⏸️ Droit de limitation</h3>
                      <p>Vous pouvez demander la limitation du traitement de vos données personnelles.</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">📦 Droit de portabilité</h3>
                      <p>Vous pouvez récupérer vos données personnelles dans un format structuré et lisible.</p>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">🚫 Droit d'opposition</h3>
                      <p>Vous pouvez vous opposer au traitement de vos données personnelles pour des raisons tenant à votre situation particulière.</p>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">🔄 Droit de retrait du consentement</h3>
                      <p>Vous pouvez retirer votre consentement à tout moment lorsque le traitement est basé sur le consentement.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 - Exercice des droits */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  7. Comment exercer vos droits
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Pour exercer vos droits, vous pouvez nous contacter :
                  </p>
                  
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-gray900 mb-2">📧 Par email</h3>
                    <p>
                      <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900 font-semibold">contact@lapetitevitrine.com</a>
                    </p>
                    <p className="text-sm mt-1">Objet : "Demande d'exercice de droits RGPD"</p>
                  </div>

                  <div className="bg-blue-gray50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-gray900 mb-2">📞 Par téléphone</h3>
                    <p>
                      <a href="tel:0673981638" className="text-amber-700 hover:text-amber-900 font-semibold">06 73 98 16 38</a>
                    </p>
                    <p className="text-sm mt-1">Du lundi au vendredi de 9h à 18h</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-gray900 mb-2">✉️ Par courrier</h3>
                    <p className="font-semibold">Next Impact - La Petite Vitrine</p>
                    <p>4 rue du Centre</p>
                    <p>15400 Trizac, France</p>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-4 py-2">
                    <p className="font-semibold">⏱️ Délai de réponse</p>
                    <p>Nous nous engageons à répondre à votre demande dans un délai maximum de 30 jours.</p>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4 py-2">
                    <p className="font-semibold">📄 Pièces justificatives</p>
                    <p>Pour traiter votre demande, nous pourrons vous demander de fournir une copie de votre pièce d'identité.</p>
                  </div>
                </div>
              </section>

              {/* Section 8 - Sécurité */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  8. Sécurité des données
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Nous mettons en place des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles :
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">🔐 Mesures techniques</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Chiffrement des données sensibles (SSL/TLS)</li>
                        <li>Authentification forte et mots de passe sécurisés</li>
                        <li>Sauvegardes régulières et sécurisées</li>
                        <li>Mise à jour régulière des systèmes</li>
                        <li>Surveillance et détection des intrusions</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">👥 Mesures organisationnelles</h3>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Accès aux données limité aux personnes autorisées</li>
                        <li>Formation du personnel à la protection des données</li>
                        <li>Politique de confidentialité interne</li>
                        <li>Procédures de gestion des incidents</li>
                        <li>Audits de sécurité réguliers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9 - Cookies */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  9. Cookies et technologies similaires
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Notre site utilise des cookies pour améliorer votre expérience utilisateur :
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">🍪 Types de cookies</h3>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                        <li><strong>Cookies de performance :</strong> Statistiques anonymes de fréquentation</li>
                        <li><strong>Cookies de préférences :</strong> Mémorisation de vos choix</li>
                        <li><strong>Cookies marketing :</strong> Publicité ciblée (avec consentement)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-blue-gray900 mb-2">⚙️ Gestion des cookies</h3>
                      <p>
                        Vous pouvez gérer vos préférences cookies via :
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Notre bandeau de gestion des cookies</li>
                        <li>Les paramètres de votre navigateur</li>
                        <li>Les liens de désabonnement dans nos emails</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 10 - Modifications */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  10. Modifications de cette politique
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Nous pouvons modifier cette politique de confidentialité à tout moment. En cas de modification significative, nous vous en informerons :
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Par email aux utilisateurs enregistrés</li>
                    <li>Par notification sur notre site web</li>
                    <li>Par mise à jour de la date de dernière modification</li>
                  </ul>
                  <p>
                    Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques en matière de protection des données.
                  </p>
                </div>
              </section>

              {/* Section 11 - Réclamations */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  11. Réclamations et autorité de contrôle
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Si vous estimez que vos droits ne sont pas respectés, vous pouvez :
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">1️⃣ Nous contacter directement</h3>
                      <p>
                        Email : <a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900">contact@lapetitevitrine.com</a>
                      </p>
                      <p>Nous nous efforçons de résoudre tous les problèmes à l'amiable.</p>
                    </div>

                    <div className="bg-blue-gray50 p-4 rounded-lg">
                      <h3 className="font-semibold text-blue-gray900 mb-2">2️⃣ Saisir la CNIL</h3>
                      <p><strong>Commission Nationale de l'Informatique et des Libertés</strong></p>
                      <p>3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07</p>
                      <p>Téléphone : 01 53 73 22 22</p>
                      <p>Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900">cnil.fr</a></p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 12 - Contact */}
              <section>
                <h2 className="text-xl font-heading-4 text-blue-gray900 mb-4">
                  12. Contact et questions
                </h2>
                <div className="space-y-4 text-blue-gray700 font-body-m">
                  <p>
                    Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, contactez-nous :
                  </p>
                  
                  <div className="bg-amber-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold text-blue-gray900 mb-2">📧 Email</h3>
                        <p><a href="mailto:contact@lapetitevitrine.com" className="text-amber-700 hover:text-amber-900 font-semibold">contact@lapetitevitrine.com</a></p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-gray900 mb-2">📞 Téléphone</h3>
                        <p><a href="tel:0673981638" className="text-amber-700 hover:text-amber-900 font-semibold">06 73 98 16 38</a></p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-gray900 mb-2">📍 Adresse</h3>
                        <p>4 rue du Centre<br />15400 Trizac, France</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-gray900 mb-2">🕐 Horaires</h3>
                        <p>Lundi - Vendredi<br />9h - 18h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div className="text-center pt-8 border-t border-amber-200">
                <p className="text-blue-gray600 font-body-m">
                  Cette politique de confidentialité a été mise à jour le 8 janvier 2025.
                </p>
                <p className="text-blue-gray600 font-body-m mt-2">
                  Next Impact - La Petite Vitrine s'engage à protéger votre vie privée.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PolitiqueConfidentialitePage;