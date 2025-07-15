import React from 'react';
import { FileUpload } from '../FileUpload';
import { FolderIcon, ImageIcon, FileTextIcon, PaperclipIcon } from 'lucide-react';
import type { StepProps } from '../../../types/formTypes';

export const FilesStep: React.FC<StepProps> = ({ formData, setFormData, errors }) => {
  const handleVisualFilesChange = (files: File[]) => {
    setFormData({ ...formData, visualFiles: files });
  };

  const handleTextFilesChange = (files: File[]) => {
    setFormData({ ...formData, textFiles: files });
  };

  const handleOtherFilesChange = (files: File[]) => {
    setFormData({ ...formData, otherFiles: files });
  };

  const getTotalFiles = () => {
    return formData.visualFiles.length + formData.textFiles.length + formData.otherFiles.length;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTotalSize = () => {
    const allFiles = [...formData.visualFiles, ...formData.textFiles, ...formData.otherFiles];
    const totalBytes = allFiles.reduce((sum, file) => sum + file.size, 0);
    return formatFileSize(totalBytes);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Fichiers et contenus
        </h2>
        <p className="text-gray-600">
          Partagez vos éléments visuels et contenus existants pour nous aider à créer votre site web
        </p>
        
        {/* Résumé des fichiers */}
        {getTotalFiles() > 0 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center gap-2 text-amber-800">
              <FolderIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {getTotalFiles()} fichier{getTotalFiles() > 1 ? 's' : ''} sélectionné{getTotalFiles() > 1 ? 's' : ''} 
                ({getTotalSize()})
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Éléments visuels */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Éléments visuels</h3>
          </div>
          
          <FileUpload
            label="Logo, charte graphique, photos..."
            description="Formats acceptés : JPG, PNG, GIF, SVG, PDF, AI, EPS, PSD"
            files={formData.visualFiles}
            onFilesChange={handleVisualFilesChange}
            accept="image/*,.pdf,.ai,.eps,.psd,.svg"
            maxFiles={10}
          />
          
          <div className="mt-3 text-sm text-gray-600">
            <p><strong>Conseils :</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Logo en haute résolution (PNG ou SVG de préférence)</li>
              <li>Photos professionnelles de vos produits/services</li>
              <li>Charte graphique existante si disponible</li>
            </ul>
          </div>
        </div>

        {/* Textes et contenus */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileTextIcon className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Textes et contenus</h3>
          </div>
          
          <FileUpload
            label="Brochures, présentations, textes..."
            description="Formats acceptés : PDF, DOC, DOCX, TXT, RTF, PPT, PPTX"
            files={formData.textFiles}
            onFilesChange={handleTextFilesChange}
            accept=".pdf,.doc,.docx,.txt,.rtf,.ppt,.pptx"
            maxFiles={10}
          />
          
          <div className="mt-3 text-sm text-gray-600">
            <p><strong>Utile pour :</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Textes de présentation existants</li>
              <li>Descriptions de services détaillées</li>
              <li>Catalogues ou brochures actuels</li>
            </ul>
          </div>
        </div>

        {/* Autres fichiers */}
        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <PaperclipIcon className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">Autres fichiers</h3>
          </div>
          
          <FileUpload
            label="Tout autre document utile"
            description="Tous formats acceptés"
            files={formData.otherFiles}
            onFilesChange={handleOtherFilesChange}
            accept="*/*"
            maxFiles={5}
          />
          
          <div className="mt-3 text-sm text-gray-600">
            <p><strong>Exemples :</strong></p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Fichiers de références ou inspirations</li>
              <li>Documents techniques spécifiques</li>
              <li>Tout élément que vous jugez utile</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Informations importantes */}
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 mt-0.5">📁</div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Formats et tailles
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Taille maximale par fichier :</strong> 10 MB</p>
                <p><strong>Nombre total de fichiers :</strong> jusqu'à 25 fichiers</p>
                <p><strong>Formats recommandés :</strong></p>
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Images : PNG, JPG, SVG</li>
                  <li>Documents : PDF, DOC, DOCX</li>
                  <li>Graphiques : AI, EPS, PSD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-green-600 mt-0.5">✅</div>
            <div>
              <h4 className="font-medium text-green-900 mb-1">
                Fichiers optionnels
              </h4>
              <p className="text-sm text-green-800">
                Vous pouvez finaliser votre demande sans fichiers et nous les envoyer ultérieurement par email si nécessaire. 
                Cependant, plus vous nous fournirez d'éléments, plus notre devis sera précis et adapté à vos besoins.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-amber-600 mt-0.5">🔒</div>
            <div>
              <h4 className="font-medium text-amber-900 mb-1">
                Sécurité et confidentialité
              </h4>
              <p className="text-sm text-amber-800">
                Vos fichiers sont transmis de manière sécurisée et ne seront utilisés que dans le cadre de votre projet. 
                Nous respectons la confidentialité de vos données et ne les partageons avec aucun tiers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étape finale */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold text-amber-900 mb-2">
            🎯 Prêt à finaliser votre demande ?
          </h4>
          <p className="text-amber-800 mb-4">
            Vous avez rempli toutes les informations nécessaires. Cliquez sur "Envoyer" pour nous transmettre votre demande de devis.
          </p>
          <div className="text-sm text-amber-700 space-y-1">
            <p><strong>Prochaines étapes :</strong></p>
            <p>1. Analyse de votre demande sous 24h</p>
            <p>2. Devis personnalisé sous 48h</p>
            <p>3. Échange téléphonique pour affiner le projet</p>
          </div>
        </div>
      </div>
    </div>
  );
};