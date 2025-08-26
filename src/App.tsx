import React from 'react';
import UserList from './components/UserList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 relative overflow-x-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-40" style={{background: 'radial-gradient(circle at 20% 20%, #14532d22 0%, transparent 70%), radial-gradient(circle at 80% 0%, #22c55e22 0%, transparent 70%)'}} />

      <header className="relative z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="relative">
            {/* Animated green glow */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-green-400/30 via-green-600/20 to-green-900/10 blur-2xl animate-pulse z-0" />
            <div className="relative z-10 backdrop-blur-md bg-gradient-to-br from-green-800/90 to-green-900/90 border border-green-700 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center">
              <h1 className="text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-xl text-center">
                User Management System
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-700 rounded-full mb-6 shadow-lg" />
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserList />
      </main>

      <footer className="bg-gray-950 border-t border-green-900 mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-green-300 text-sm">
            <p>Demonstrates REST API integration with custom React hooks</p>
          </div>
        </div>
      </footer>
    </div>
  );
}