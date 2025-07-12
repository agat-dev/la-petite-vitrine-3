import React, { useCallback } from 'react';
import { UploadIcon, XIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  label: string;
  description?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  files,
  onFilesChange,
  accept = "*/*",
  maxFiles = 5,
  className
}) => {
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
    onFilesChange(newFiles);
  }, [files, maxFiles, onFilesChange]);

  const handleRemoveFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  }, [files, onFilesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
    onFilesChange(newFiles);
  }, [files, maxFiles, onFilesChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-amber-400 transition-colors"
      >
        <UploadIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-2">
          Glissez vos fichiers ici ou cliquez pour sélectionner
        </p>
        <input
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          id={`file-upload-${label}`}
        />
        <label
          htmlFor={`file-upload-${label}`}
          className="inline-block bg-amber-50 text-amber-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-amber-100 transition-colors"
        >
          Sélectionner des fichiers
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Fichiers sélectionnés ({files.length}/{maxFiles})
          </p>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <XIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};