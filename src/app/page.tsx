import { GlitterAnimation } from '@/components/GlitterAnimation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background glitter animation */}
      <div className="glitter-container">
        <GlitterAnimation width={window.innerWidth} height={window.innerHeight} />
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text">
            Dust
          </h1>
          <ConnectButton />
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Token-Gated Commerce */}
          <div className="nft-card">
            <h2 className="text-2xl font-semibold mb-4">Token-Gated Commerce</h2>
            <p className="text-gray-300 mb-4">
              Purchase supplements and receive exclusive NFT deeds that unlock premium features.
            </p>
            <button className="web3-button">
              Explore Products
            </button>
          </div>

          {/* Decentralized Identity */}
          <div className="nft-card">
            <h2 className="text-2xl font-semibold mb-4">Decentralized Identity</h2>
            <p className="text-gray-300 mb-4">
              Secure your health data with Ceramic Network and build your Dust Consumption Score.
            </p>
            <button className="web3-button">
              Connect Identity
            </button>
          </div>

          {/* DAO Governance */}
          <div className="nft-card">
            <h2 className="text-2xl font-semibold mb-4">DAO Governance</h2>
            <p className="text-gray-300 mb-4">
              Vote on new supplement formulas and shape the future of Dust.
            </p>
            <button className="web3-button">
              Join DAO
            </button>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Product cards will be dynamically populated */}
          </div>
        </section>

        {/* Community Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="dao-proposal text-center">
            <h3 className="text-4xl font-bold mb-2">1,337</h3>
            <p className="text-gray-300">NFT Holders</p>
          </div>
          <div className="dao-proposal text-center">
            <h3 className="text-4xl font-bold mb-2">42</h3>
            <p className="text-gray-300">DAO Proposals</p>
          </div>
          <div className="dao-proposal text-center">
            <h3 className="text-4xl font-bold mb-2">69</h3>
            <p className="text-gray-300">Community Members</p>
          </div>
        </section>
      </div>
    </main>
  );
} 