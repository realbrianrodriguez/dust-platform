import { useState, useEffect } from 'react';
import { getTransactionData } from '@/lib/solana';

interface TransactionData {
  txSpeed: number;
  gasFees: number;
  timestamp: number;
}

export const useTransactionData = (pollingInterval = 5000) => {
  const [data, setData] = useState<TransactionData>({
    txSpeed: 0,
    gasFees: 0,
    timestamp: Date.now(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const txData = await getTransactionData();
        setData(txData);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling
    const interval = setInterval(fetchData, pollingInterval);

    // Cleanup
    return () => clearInterval(interval);
  }, [pollingInterval]);

  return data;
}; 