#!/usr/bin/env node
import genDiff from '..';

const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(genDiff(first, second));
  })
  .parse(process.argv);
