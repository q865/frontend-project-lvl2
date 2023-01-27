import fs from 'fs';
import { Command } from 'commander';

import path from 'path';

const program = new Command();
const result = {};

function readFile(file) {
  return JSON.parse(fs.readFileSync(path.resolve(file), 'utf-8'));
}

function writeDifference(keys, json, json1, json2, operand) {
  keys
    .sort()
    .forEach((key) => {
      if (json1[key] === json2[key]) {
        result[`  ${key}`] = json1[key];
      } else {
        result[`${operand} ${key}`] = json[key];
      }
    });
}

function checkFiles(firstFile, secondFile) {
  const json1 = readFile(firstFile);
  const json2 = readFile(secondFile);
  const keys2 = Object.keys(json2);
  const keys1 = Object.keys(json1);
  writeDifference(keys1, json1, json1, json2, '-');
  writeDifference(keys2, json2, json1, json2, '+');
  console.log(result);
  // return result
}

export default () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(checkFiles);
  program.parse(process.argv);
};

// const options = program.opts();
