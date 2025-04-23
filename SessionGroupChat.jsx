"use client";

import { useState } from 'react';

// Session app integration component
export default function SessionGroupChat({ courseId, groupName, groupDescription }) {
  const [groupLink, setGroupLink] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Generate a unique Session group ID based on course ID
  const generateGroupId = () => {
    return `egyptianmindset-course-${courseId}-${Date.now()}`;
  };
  
  // Create a new Session group for the course
  const createSessionGroup = async () => {
    try {
      setIsCreating(true);
      setError('');
      
      // In a real implementation, this would call an API to create a Session group
      // For now, we'll simulate the creation with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a Session deep link
      const groupId = generateGroupId();
      const sessionLink = `https://getsession.org/group/#${groupId}`;
      
      setGroupLink(sessionLink);
      setSuccess(true);
    } catch (err) {
      setError('Error creating Session group');
      console.error(err);
    } finally {
      setIsCreating(false);
    }
  };
  
  return (
    <div className="session-group-chat border border-gray-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Course Discussion Group</h3>
      
      <p className="mb-4">
        Session is a private, secure messaging app that allows you to create encrypted group chats.
        Join or create a Session group for this course to collaborate with other students.
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {success && groupLink ? (
        <div className="mb-6">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">Session group created successfully!</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Group Link:
            </label>
            <div className="flex">
              <input
                type="text"
                value={groupLink}
                readOnly
                className="shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-grow"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(groupLink);
                  alert('Link copied to clipboard!');
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
              >
                Copy
              </button>
            </div>
          </div>
          
          <a
            href={groupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Open in Session App
          </a>
        </div>
      ) : (
        <div className="mb-6">
          <p className="mb-4">
            Create a new Session group for this course or use an existing group link.
          </p>
          
          <button
            onClick={createSessionGroup}
            disabled={isCreating}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded inline-block mr-2"
          >
            {isCreating ? 'Creating Group...' : 'Create New Group'}
          </button>
        </div>
      )}
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">How to use Session:</h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Download the Session app from <a href="https://getsession.org/download" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">getsession.org</a></li>
          <li>Create an anonymous account (no phone number or email required)</li>
          <li>Click the group link above to join the course discussion group</li>
          <li>Start collaborating with your classmates securely and privately</li>
        </ol>
      </div>
    </div>
  );
}
