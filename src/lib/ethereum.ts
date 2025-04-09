import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || '' }),
    publicProvider(),
  ]
);

// Configure RainbowKit
const { connectors } = getDefaultWallets({
  appName: 'Dust Platform',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains,
});

// Create Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

// Export chains for RainbowKit
export { chains };

// Contract addresses
export const CONTRACT_ADDRESSES = {
  DUST_MATTER: process.env.NEXT_PUBLIC_DUST_MATTER_ADDRESS as `0x${string}`,
  TOKEN_DISPENSER: process.env.NEXT_PUBLIC_TOKEN_DISPENSER_ADDRESS as `0x${string}`,
  MATTER_DAO: process.env.NEXT_PUBLIC_MATTER_DAO_ADDRESS as `0x${string}`,
}; 