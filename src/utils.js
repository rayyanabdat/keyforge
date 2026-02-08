export const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
  green: '\x1b[32m',
  yellow: '\x1b[33m'
};

export function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

export function printBanner() {
  const bannerLines = [
    '██╗  ██╗███████╗██╗   ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗',
    '██║ ██╔╝██╔════╝╚██╗ ██╔╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝',
    '█████╔╝ █████╗   ╚████╔╝ █████╗  ██║   ██║██████╔╝██║  ███╗█████╗',
    '██╔═██╗ ██╔══╝    ╚██╔╝  ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝',
    '██║  ██╗███████╗   ██║   ██║     ╚██████╔╝██║  ██║╚██████╔╝█████╗',
    '╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝'
  ];

  console.log();
  for (const line of bannerLines) {
    console.log(colors.cyan + line + colors.reset);
  }
  console.log();

  console.log(
    colors.gray +
    'EVM & Solana Wallet Generator\n' +
    'Non-custodial • Local-only • CLI\n' +
    'Made with passion by gogetrekt\n' +
    colors.reset
  );
}
