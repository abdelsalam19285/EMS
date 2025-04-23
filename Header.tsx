"use client";

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function Header() {
  const { user, isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">EgyptianMindset</Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/courses" className="hover:text-amber-400 transition-colors">
            Courses
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="hover:text-amber-400 transition-colors">
                Dashboard
              </Link>
              
              {isAdmin && (
                <Link href="/admin" className="hover:text-amber-400 transition-colors">
                  Admin
                </Link>
              )}
              
              <Link 
                href="/api/auth/signout"
                className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-md transition-colors"
              >
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="hover:text-amber-400 transition-colors"
              >
                Login
              </Link>
              
              <Link 
                href="/register"
                className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-md transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
