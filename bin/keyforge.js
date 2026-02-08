#!/usr/bin/env node

import { interactive } from '../src/interactive.js';
import { direct } from '../src/direct.js';

const args = process.argv.slice(2);

if (args.length === 0) {
  await interactive();
  process.exit(0);
}

await direct(args);
