import { Command } from 'commander';
const program = new Command();

export default () => {
  program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1')
    .option('-f, --format [type]', 'output format')
    .arguments('<filepath1>')
    .arguments('<filepath2>')

  program.parse(process.argv);
};
const options = program.opts();
