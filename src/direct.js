import { generateEVM } from './generators/evm.js';
import { generateSolana } from './generators/solana.js';
import { saveCSV } from './csv.js';
import { getTimestamp, printBanner, colors } from './utils.js';

export async function direct(args) {
  printBanner();

  const chain = args[0];

  if (!['evm', 'solana'].includes(chain)) {
    console.error('Usage: npx keyforge <evm|solana> --<number>');
    process.exit(1);
  }

  const numberFlags = args.filter(a => /^--\d+$/.test(a));
  if (numberFlags.length !== 1) {
    console.error('Usage: npx keyforge <evm|solana> --<number>');
    process.exit(1);
  }

  const count = parseInt(numberFlags[0].slice(2), 10);
  if (!Number.isInteger(count) || count <= 0) {
    console.error('Invalid wallet count');
    process.exit(1);
  }

  let wallets;
  if (chain === 'evm') {
    wallets = generateEVM(count);
  } else {
    wallets = generateSolana(count);
  }

  const timestamp = getTimestamp();
  const filename = `${chain}-${timestamp}.csv`;
  const filepath = await saveCSV(chain, wallets, filename);

  console.log(colors.green + `✔ Chain: ${chain.toUpperCase()}` + colors.reset);
  console.log(colors.green + `✔ Wallets generated: ${count}` + colors.reset);
  console.log(colors.green + `✔ Saved to ${filepath}` + colors.reset);
  console.log(colors.yellow + '⚠️ Store this file securely. Private keys are not recoverable.' + colors.reset);
  console.log();
}
