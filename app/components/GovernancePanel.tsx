'use client';

import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

const PROPOSALS = [
  {
    id: 1,
    title: 'Add New Supplement: Zinc',
    description: 'Proposal to add Zinc supplement to the platform',
    status: 'Active',
    votes: { for: 120, against: 30, abstain: 10 },
  },
  {
    id: 2,
    title: 'Update Reward Rate',
    description: 'Increase GLTR rewards for health data sharing by 20%',
    status: 'Pending',
    votes: { for: 0, against: 0, abstain: 0 },
  },
];

export function GovernancePanel() {
  const { isConnected } = useAccount();
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  if (!isConnected) {
    return (
      <div className="text-gray-400">
        Connect your wallet to view and participate in governance
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Create Proposal
        </button>
      </div>

      <div className="space-y-4">
        {PROPOSALS.map((proposal) => (
          <div
            key={proposal.id}
            className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
            onClick={() => setSelectedProposal(proposal.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{proposal.title}</h3>
              <span className={`px-2 py-1 text-sm rounded ${
                proposal.status === 'Active' ? 'bg-green-600' : 'bg-yellow-600'
              }`}>
                {proposal.status}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">{proposal.description}</p>
            
            {proposal.status === 'Active' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>For: {proposal.votes.for}</span>
                  <span>Against: {proposal.votes.against}</span>
                  <span>Abstain: {proposal.votes.abstain}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Vote For
                  </button>
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Vote Against
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors">
                    Abstain
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 