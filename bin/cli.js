
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { mergeAnagramAndGraphGroups } from '../lib/anagramGrouper.js';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CLI arg
const inputFile = process.argv[2];

if (!inputFile) {
  console.error('❌ Please provide a JSON input file as an argument.');
  process.exit(1);
}

try {
  const inputData = fs.readFileSync(path.resolve(__dirname, inputFile), 'utf-8');
  const parsedInput = JSON.parse(inputData);
  const result = mergeAnagramAndGraphGroups(parsedInput);
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
