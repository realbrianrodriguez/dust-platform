import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// Initialize Solana connection
export const getSolanaConnection = () => {
  const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta');
  return new Connection(rpcUrl, 'confirmed');
};

// Utility function to format Solana address
export const formatSolanaAddress = (address: string): string => {
  try {
    const pubKey = new PublicKey(address);
    return `${pubKey.toString().slice(0, 4)}...${pubKey.toString().slice(-4)}`;
  } catch (error) {
    return 'Invalid Address';
  }
};

// Get real-time transaction data for glitter animations
export const getTransactionData = async () => {
  const connection = getSolanaConnection();
  const recentBlockhash = await connection.getRecentBlockhash();
  
  return {
    txSpeed: recentBlockhash.blockhash.length,
    gasFees: recentBlockhash.feeCalculator.lamportsPerSignature,
    timestamp: Date.now(),
  };
};

// Constants for glitter animation parameters
export const GLITTER_CONFIG = {
  PARTICLE_COUNT: 1000,
  MAX_VELOCITY: 5,
  MIN_VELOCITY: 1,
  DENSITY_MULTIPLIER: 0.1,
  COLOR_RANGE: {
    MIN: 0x000000,
    MAX: 0xFFFFFF,
  },
}; 