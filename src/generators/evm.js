import { ethers } from 'ethers';

export function generateEVM(count) {
  const wallets = [];

  for (let i = 1; i <= count; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push({
      index: i,
      address: wallet.address,
      privateKey: wallet.privateKey
    });
  }

  return wallets;
}
