#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.6')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => {
    console.log(genDiff(first, second, program.format));
  })
  .parse(process.argv);
