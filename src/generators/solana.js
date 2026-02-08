import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

export function generateSolana(count) {
  const wallets = [];

  for (let i = 1; i <= count; i++) {
    const keypair = Keypair.generate();
    const secretKey = bs58.encode(keypair.secretKey);
    const address = keypair.publicKey.toString();

    wallets.push({
      index: i,
      address: address,
      secretKey: secretKey
    });
  }

  return wallets;
}
