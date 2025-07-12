import React from 'react';
import FileUpload from '../components/FileUpload';

const FilesStep = ({ onFileChange, files }) => {
  return (
    <div>
      <h2>Upload Your Files</h2>
      <p>Please upload the following files:</p>
      <FileUpload
        label="Visual Elements (logo, branding, photos, etc.)"
        onChange={(file) => onFileChange('visualElements', file)}
      />
      <FileUpload
        label="Texts and Content"
        onChange={(file) => onFileChange('textsContent', file)}
      />
      <FileUpload
        label="Other Files"
        onChange={(file) => onFileChange('otherFiles', file)}
      />
      <div>
        <label>Link to Existing Content:</label>
        <input
          type="url"
          placeholder="Enter URL"
          onChange={(e) => onFileChange('existingContentLink', e.target.value)}
        />
      </div>
    </div>
  );
};

export default FilesStep;