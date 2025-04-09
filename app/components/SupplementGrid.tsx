'use client';

import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import Image from 'next/image';

const SUPPLEMENTS = [
  {
    id: 1,
    name: 'Vitamin D3',
    image: '/supplements/vitamin-d.png',
    description: 'Essential for bone health and immune function',
  },
  {
    id: 2,
    name: 'Omega-3',
    image: '/supplements/omega-3.png',
    description: 'Supports heart and brain health',
  },
  {
    id: 3,
    name: 'Magnesium',
    image: '/supplements/magnesium.png',
    description: 'Important for muscle and nerve function',
  },
];

export function SupplementGrid() {
  const { address } = useAccount();
  const [selectedSupplement, setSelectedSupplement] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SUPPLEMENTS.map((supplement) => (
        <div
          key={supplement.id}
          className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors cursor-pointer"
          onClick={() => setSelectedSupplement(supplement.id)}
        >
          <div className="aspect-square relative mb-2">
            <Image
              src={supplement.image}
              alt={supplement.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <h3 className="text-lg font-semibold text-white">{supplement.name}</h3>
          <p className="text-gray-300 text-sm">{supplement.description}</p>
        </div>
      ))}
    </div>
  );
} 