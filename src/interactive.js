import inquirer from 'inquirer';
import { generateEVM } from './generators/evm.js';
import { generateSolana } from './generators/solana.js';
import { saveCSV } from './csv.js';
import { getTimestamp, printBanner, colors } from './utils.js';

export async function interactive() {
  printBanner();

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'chain',
      message: 'Select blockchain:',
      choices: ['EVM', 'Solana']
    },
    {
      type: 'number',
      name: 'count',
      message: 'Number of wallets to generate:',
      validate: (input) => {
        if (isNaN(input) || input <= 0) {
          return 'Please enter a positive number';
        }
        return true;
      }
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Generate wallets?',
      default: true
    }
  ]);

  if (!answers.confirm) {
    console.log('Cancelled.');
    process.exit(0);
  }

  const chain = answers.chain.toLowerCase();
  const count = answers.count;

  let wallets;
  if (chain === 'evm') {
    wallets = generateEVM(count);
  } else {
    wallets = generateSolana(count);
  }

  const timestamp = getTimestamp();
  const filename = `${chain}-${timestamp}.csv`;
  const filepath = await saveCSV(chain, wallets, filename);

  console.log(colors.green + `✔ Chain: ${answers.chain}` + colors.reset);
  console.log(colors.green + `✔ Wallets generated: ${count}` + colors.reset);
  console.log(colors.green + `✔ Saved to ${filepath}` + colors.reset);
  console.log(colors.yellow + '⚠️ Store this file securely. Private keys are not recoverable.' + colors.reset);
  console.log();
}
