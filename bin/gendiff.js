#!/usr/bin/env node

import { Command } from 'commander';

import getDiff from '../flatGendiff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => getDiff(filepath1, filepath2));
  

program
  .option('-f, --format <type>', 'output format');

program.parse(process.argv); 
