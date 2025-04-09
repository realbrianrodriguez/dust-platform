'use client';

import React from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { formatEther } from 'viem';

const TOKEN_ADDRESS = '0x...'; // Will be filled after deployment

export function TokenBalance() {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useContractRead({
    address: TOKEN_ADDRESS as `0x${string}`,
    abi: [{
      name: 'balanceOf',
      type: 'function',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view'
    }],
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    enabled: Boolean(address),
  }) as { data: bigint | undefined, isLoading: boolean };

  if (!isConnected) {
    return (
      <div className="text-gray-400">
        Connect your wallet to view your GLTR balance
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-gray-400">
        Loading balance...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-gray-300">Available Balance:</span>
        <span className="text-2xl font-bold text-purple-400">
          {balance ? formatEther(balance) : '0'} GLTR
        </span>
      </div>
      
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
        Claim Rewards
      </button>
    </div>
  );
} 