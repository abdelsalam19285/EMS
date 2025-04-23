"use client";

import Header from '@/components/Header';
import { useAuth } from '@/lib/auth-context';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { user, isAdmin, isAuthenticated, isLoading } = useAuth();
  
  // This is a client component, so we need to handle the loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  // Redirect to login if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Platform Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">6</p>
                <p className="text-gray-600">Total Courses</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">1</p>
                <p className="text-gray-600">Total Users</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">0</p>
                <p className="text-gray-600">Enrollments</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-amber-600">6</p>
                <p className="text-gray-600">Categories</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Add New Course
              </button>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Manage Users
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition-colors">
                View Analytics
              </button>
              <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded transition-colors">
                Manage Categories
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Course Management</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Introduction to Data Analysis</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">data</td>
                  <td className="px-6 py-4 whitespace-nowrap">Dr. Ahmed Hassan</td>
                  <td className="px-6 py-4 whitespace-nowrap">Beginner</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Advanced Project Management</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">management</td>
                  <td className="px-6 py-4 whitespace-nowrap">Fatima El-Sayed</td>
                  <td className="px-6 py-4 whitespace-nowrap">Intermediate</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
                {/* More course rows would be dynamically generated here */}
              </tbody>
            </table>
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
