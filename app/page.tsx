import Image from 'next/image';
import { DashboardHeader } from './components/DashboardHeader';
import { SupplementGrid } from './components/SupplementGrid';
import { TokenBalance } from './components/TokenBalance';
import { GovernancePanel } from './components/GovernancePanel';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Dust Platform</h1>
              <span className="px-3 py-1 text-sm bg-purple-600 text-white rounded-full">Beta</span>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Your Supplements</h2>
              <div className="text-gray-400">Connect your wallet to view your supplements</div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">GLTR Balance</h2>
              <div className="text-gray-400">Connect your wallet to view your balance</div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Governance</h2>
            <div className="text-gray-400">Connect your wallet to participate in governance</div>
          </div>
        </div>
      </div>
    </main>
  );
} 