'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function DashboardHeader() {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Dust Platform</h1>
            <span className="px-3 py-1 text-sm bg-purple-600 text-white rounded-full">Beta</span>
          </div>
          
          <ConnectButton />
        </div>
      </div>
    </header>
  );
} 