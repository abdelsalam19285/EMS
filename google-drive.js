import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// This file will contain the Google Drive API integration

// These credentials would be provided by the Google Cloud Console
// For development, we're using placeholder values
const CREDENTIALS = {
  client_email: 'placeholder@egyptianmindset.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nplaceholder\n-----END PRIVATE KEY-----\n',
  client_id: 'placeholder-client-id',
};

// Scopes for Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive'];

/**
 * Create an authorized client for Google Drive API
 */
export const getGoogleDriveClient = () => {
  const auth = new JWT({
    email: CREDENTIALS.client_email,
    key: CREDENTIALS.private_key,
    scopes: SCOPES,
  });

  return google.drive({ version: 'v3', auth });
};

/**
 * List files in a specific folder
 * @param {string} folderId - The ID of the folder to list files from
 */
export const listFilesInFolder = async (folderId) => {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, webViewLink)',
    });

    return response.data.files;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

/**
 * Get a file by ID
 * @param {string} fileId - The ID of the file to get
 */
export const getFileById = async (fileId) => {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink',
    });

    return response.data;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};

/**
 * Generate a download URL for a file
 * @param {string} fileId - The ID of the file to download
 */
export const getDownloadUrl = async (fileId) => {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.files.get({
      fileId,
      fields: 'webContentLink',
    });

    return response.data.webContentLink;
  } catch (error) {
    console.error('Error generating download URL:', error);
    throw error;
  }
};

/**
 * Create a new folder in Google Drive
 * @param {string} folderName - The name of the folder to create
 * @param {string} parentFolderId - The ID of the parent folder (optional)
 */
export const createFolder = async (folderName, parentFolderId = null) => {
  try {
    const drive = getGoogleDriveClient();
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    if (parentFolderId) {
      fileMetadata.parents = [parentFolderId];
    }

    const response = await drive.files.create({
      resource: fileMetadata,
      fields: 'id, name',
    });

    return response.data;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

/**
 * Upload a file to Google Drive
 * @param {string} fileName - The name of the file to upload
 * @param {string} filePath - The path to the file to upload
 * @param {string} folderId - The ID of the folder to upload to (optional)
 */
export const uploadFile = async (fileName, filePath, folderId = null) => {
  try {
    const drive = getGoogleDriveClient();
    const fileMetadata = {
      name: fileName,
    };

    if (folderId) {
      fileMetadata.parents = [folderId];
    }

    const media = {
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, name, webViewLink',
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Share a file or folder with a specific user
 * @param {string} fileId - The ID of the file or folder to share
 * @param {string} email - The email address of the user to share with
 * @param {string} role - The role to grant (reader, writer, commenter)
 */
export const shareFileWithUser = async (fileId, email, role = 'reader') => {
  try {
    const drive = getGoogleDriveClient();
    const response = await drive.permissions.create({
      fileId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sharing file:', error);
    throw error;
  }
};
