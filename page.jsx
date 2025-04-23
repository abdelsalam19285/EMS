"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import SessionGroupChat from '@/components/SessionGroupChat';
import Link from 'next/link';

export default function CourseSessionPage({ params }) {
  const courseId = parseInt(params.id);
  const [course, setCourse] = useState({
    id: courseId,
    title: courseId === 1 ? 'Introduction to Data Analysis' : 'Advanced Project Management',
    description: 'Course description would be loaded here in a real implementation.'
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href={`/courses/${courseId}`} className="text-amber-600 hover:text-amber-700">
            &larr; Back to Course Details
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">{course.title} - Discussion Group</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <SessionGroupChat 
              courseId={courseId}
              groupName={`${course.title} Discussion`}
              groupDescription={`Discussion group for students enrolled in ${course.title}`}
            />
          </div>
          
          <div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Group Guidelines</h3>
              
              <div className="space-y-4">
                <p>
                  To ensure a productive learning environment, please follow these guidelines when participating in the course discussion group:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Be respectful and supportive of your fellow students</li>
                  <li>Stay on topic and keep discussions relevant to the course material</li>
                  <li>Share resources and insights that may benefit others</li>
                  <li>Ask questions when you need clarification</li>
                  <li>Respect privacy and confidentiality</li>
                  <li>Do not share the group link with people not enrolled in the course</li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">Session App Features</h3>
              
              <div className="space-y-4">
                <p>
                  Session is a privacy-focused messaging app that offers several features for secure communication:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>End-to-end encryption for all messages</li>
                  <li>No phone number or email required</li>
                  <li>Anonymous account creation</li>
                  <li>Decentralized network for enhanced privacy</li>
                  <li>Group chats with up to 100 participants</li>
                  <li>File sharing capabilities</li>
                  <li>Voice messages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} EgyptianMindset. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
