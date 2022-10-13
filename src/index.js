import _ from 'lodash';
import fs from 'fs'
import { Command } from 'commander';
const program = new Command();

import path from 'path'

export default () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1')
    .option('-f, --format <type>', 'output format')
    .arguments('<filepath1> <filepath2>')
    .action(checkFiles)
  program.parse(process.argv);
};

const readFile = file => JSON.parse(fs.readFileSync(path.resolve(file), 'utf-8'))

const writeDifference = (keys, json, json1, json2, operand, obj) => {
  keys
    .sort()
    .forEach((key) => {
      if (json1[key] == json2[key]) {
        obj[`  ${key}`] = json1[key]
      } else {
        obj[`${operand} ${key}`] = json[key]
      }
    })
}

const checkFiles = (firstFile, secondFile) => {
  const json1 = readFile(firstFile)
  const json2 = readFile(secondFile)
  const keys2 = Object.keys(json2)
  const keys1 = Object.keys(json1)
  const result = {}
  writeDifference(keys1, json1, json1, json2, '-', result)
  writeDifference(keys2, json2, json1, json2, '+', result)
  console.log(result)
}


  // const options = program.opts();
