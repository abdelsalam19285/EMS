import { useState } from 'react';
import { useRouter } from 'next/navigation';

// This is a client component for Google Drive file selection
export default function GoogleDriveSelector({ onFileSelect }) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderHistory, setFolderHistory] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch files from a folder
  const fetchFilesFromFolder = async (folderId = null) => {
    try {
      setIsLoading(true);
      setError('');
      
      // In a real implementation, this would call an API endpoint
      // that uses the google-drive.js utility functions
      const response = await fetch(`/api/google-drive/list-files?folderId=${folderId || ''}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch files');
      }
      
      const data = await response.json();
      setFiles(data.files);
      setCurrentFolder(folderId);
      
      if (folderId) {
        setFolderHistory(prev => [...prev, folderId]);
      }
    } catch (err) {
      setError('Error fetching files from Google Drive');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to navigate back to previous folder
  const navigateBack = () => {
    if (folderHistory.length <= 1) {
      // Go back to root
      fetchFilesFromFolder(null);
      setFolderHistory([]);
    } else {
      // Go back to previous folder
      const newHistory = [...folderHistory];
      newHistory.pop(); // Remove current folder
      const previousFolder = newHistory[newHistory.length - 1];
      fetchFilesFromFolder(previousFolder);
      setFolderHistory(newHistory);
    }
  };

  // Function to handle file or folder click
  const handleItemClick = (file) => {
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      // If it's a folder, navigate into it
      fetchFilesFromFolder(file.id);
    } else {
      // If it's a file, select it
      onFileSelect(file);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Google Drive Files</h3>
        <div>
          <button
            onClick={() => fetchFilesFromFolder(null)}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
          >
            Root
          </button>
          <button
            onClick={navigateBack}
            disabled={folderHistory.length === 0}
            className={`text-sm ${
              folderHistory.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } px-3 py-1 rounded`}
          >
            Back
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p>Loading files...</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg divide-y">
          {files.length > 0 ? (
            files.map((file) => (
              <div
                key={file.id}
                onClick={() => handleItemClick(file)}
                className="p-3 flex items-center hover:bg-gray-50 cursor-pointer"
              >
                <div className="mr-3">
                  {file.mimeType === 'application/vnd.google-apps.folder' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span>{file.name}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No files found in this folder
            </div>
          )}
        </div>
      )}
    </div>
  );
}
