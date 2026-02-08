import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const walletsDir = path.join(__dirname, '..', 'wallets');

export async function saveCSV(chain, wallets, filename) {
  await fs.ensureDir(walletsDir);

  const filepath = path.join(walletsDir, filename);

  // Check if file already exists
  if (await fs.pathExists(filepath)) {
    throw new Error(`File already exists: ${filepath}`);
  }

  let csv;
  if (chain === 'evm') {
    csv = 'index,address,privateKey\n';
    wallets.forEach((wallet) => {
      csv += `${wallet.index},${wallet.address},${wallet.privateKey}\n`;
    });
  } else if (chain === 'solana') {
    csv = 'index,address,secretKey\n';
    wallets.forEach((wallet) => {
      csv += `${wallet.index},${wallet.address},${wallet.secretKey}\n`;
    });
  }

  await fs.writeFile(filepath, csv);
  return filepath;
}
