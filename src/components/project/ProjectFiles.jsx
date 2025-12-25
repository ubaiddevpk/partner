import React, { useState } from 'react';
import { FolderOpen, Upload } from 'lucide-react';

const ProjectFiles = ({ project }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    // Handle file upload logic here
    console.log('Files dropped:', files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    // Handle file upload logic here
    console.log('Files selected:', files);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-neutral-200">
        <h3 className="text-xl font-bold text-neutral-900">Files</h3>
        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm font-semibold">
          0
        </span>
      </div>

      {/* Upload Area */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-accent-orange/10 to-accent-yellow/20 rounded-2xl flex items-center justify-center mb-6">
          <FolderOpen className="w-10 h-10 text-accent-orange" strokeWidth={2} />
        </div>
        
        <h4 className="text-2xl font-bold text-neutral-900 mb-3">Project files</h4>
        <p className="text-neutral-600 text-center text-lg mb-10 max-w-2xl">
          Capture and organize job site photos and files for AI to use.
        </p>

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-12 transition-all ${
            isDragging
              ? 'border-primary-500 bg-primary-50'
              : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-primary-500' : 'text-neutral-400'}`} />
            <p className="text-lg text-neutral-700 mb-2">
              <span className="font-semibold">Drag & drop</span> or{' '}
              <label className="text-primary-600 hover:text-primary-700 font-semibold cursor-pointer underline">
                browse
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                />
              </label>
            </p>
            <p className="text-sm text-neutral-500">
              Supports: Images, PDFs, Documents, Spreadsheets
            </p>
          </div>
        </div>

        {/* Upload Tips */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary-600">📸</span>
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 text-sm mb-1">Site Photos</h5>
              <p className="text-xs text-neutral-600">Upload job site images</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
            <div className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-secondary-600">📄</span>
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 text-sm mb-1">Documents</h5>
              <p className="text-xs text-neutral-600">Store contracts & plans</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
            <div className="w-8 h-8 bg-accent-purple/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-accent-purple">🤖</span>
            </div>
            <div>
              <h5 className="font-semibold text-neutral-900 text-sm mb-1">AI Ready</h5>
              <p className="text-xs text-neutral-600">Files analyzed by AI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Future: List of uploaded files will appear here */}
      {/* 
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
        {files.map(file => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
      */}
    </div>
  );
};

export default ProjectFiles;