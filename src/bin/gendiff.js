#!/usr/bin/env node
const program = require('commander');

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    const firstConfig = first;
    const secondConfig = second;
  })
  .parse(process.argv);
