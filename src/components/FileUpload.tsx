import React from 'react';

interface FileUploadProps {
  onFileChange: (files: FileList) => void;
  label: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, label }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileChange(event.target.files);
    }
  };

  return (
    <div className="file-upload">
      <label className="file-upload-label">
        {label}
        <input
          type="file"
          className="file-upload-input"
          onChange={handleFileChange}
          multiple
        />
      </label>
    </div>
  );
};