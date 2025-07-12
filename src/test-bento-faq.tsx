import ReactDOM from 'react-dom/client';
import { FAQ } from './components/ui/faq';
import './index.css';

const bentoFAQItems = [
  {
    id: 1,
    question: "Comment créer une expérience utilisateur mémorable ?",
    answer: "Une expérience utilisateur mémorable naît de la combinaison parfaite entre design intuitif, performance technique et attention aux détails. Nous créons des interfaces qui racontent votre histoire de manière captivante, en plaçant l'utilisateur au centre de chaque décision de conception. Notre approche holistique garantit que chaque interaction soit fluide, engageante et alignée avec vos objectifs business."
  },
  {
    id: 2,
    question: "Pourquoi choisir l'architecture moderne ?",
    answer: "L'architecture moderne offre une évolutivité et une maintenabilité exceptionnelles. Nos solutions techniques s'adaptent à votre croissance."
  },
  {
    id: 3,
    question: "Support 24/7 disponible ?",
    answer: "Oui, notre équipe est disponible 24h/7j pour tous vos besoins critiques."
  },
  {
    id: 4,
    question: "Quels sont les avantages de notre méthodologie agile ?",
    answer: "Notre méthodologie agile vous permet de voir les résultats rapidement, d'ajuster le cap en cours de route et de bénéficier d'une transparence totale sur l'avancement de votre projet. Nous travaillons en sprints courts avec des livrables concrets à chaque étape, ce qui garantit une collaboration efficace et des résultats qui dépassent vos attentes."
  },
  {
    id: 5,
    question: "Sécurité des données ?",
    answer: "Chiffrement end-to-end, conformité RGPD, audits réguliers."
  },
  {
    id: 6,
    question: "Comment intégrons-nous l'intelligence artificielle dans vos projets ?",
    answer: "L'IA transforme la façon dont nous abordons les défis techniques. Nous intégrons des solutions d'apprentissage automatique, de traitement du langage naturel et d'analyse prédictive pour optimiser vos processus métier. Notre expertise couvre les dernières technologies : ChatGPT, vision par ordinateur, recommandations personnalisées et automatisation intelligente."
  },
  {
    id: 7,
    question: "Formation des équipes ?",
    answer: "Formations personnalisées pour une adoption optimale des nouvelles technologies."
  },
  {
    id: 8,
    question: "Maintenance et évolution ?",
    answer: "Support continu, mises à jour régulières, évolution selon vos besoins."
  }
];

function BentoFAQTest() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-gray50">
      <FAQ 
        title="Layout Bento Sophistiqué"
        subtitle="Découvrez notre approche innovante inspirée des boîtes bento japonaises"
        items={bentoFAQItems}
        className="bg-blue-gray900"
        maxWidth="7xl"
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<BentoFAQTest />);
