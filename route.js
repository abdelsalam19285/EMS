import { NextResponse } from 'next/server';
import { uploadFile, shareFileWithUser } from '@/lib/google-drive';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { mkdir } from 'fs/promises';

// Temporary upload directory
const UPLOAD_DIR = '/tmp/egyptianmindset-uploads';

export async function POST(request) {
  try {
    // Ensure upload directory exists
    try {
      await mkdir(UPLOAD_DIR, { recursive: true });
    } catch (err) {
      console.error('Error creating upload directory:', err);
    }

    // Get the form data from the request
    const formData = await request.formData();
    const file = formData.get('file');
    const folderId = formData.get('folderId');
    const shareWithEmail = formData.get('shareWithEmail');
    
    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      );
    }
    
    // Get the file buffer and name
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    
    // Generate a temporary file path
    const tempFilePath = join(UPLOAD_DIR, `${uuidv4()}-${fileName}`);
    
    // Write the file to the temporary location
    await writeFile(tempFilePath, buffer);
    
    // Upload the file to Google Drive
    const uploadedFile = await uploadFile(fileName, tempFilePath, folderId || null);
    
    // If shareWithEmail is provided, share the file with the user
    if (shareWithEmail) {
      await shareFileWithUser(uploadedFile.id, shareWithEmail, 'reader');
    }
    
    // Return the uploaded file details as JSON
    return NextResponse.json({ file: uploadedFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file to Google Drive' },
      { status: 500 }
    );
  }
}
