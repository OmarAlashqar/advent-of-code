import fs from 'fs';
import path from 'path';

export default (directory = '.', filename = 'input.txt'): string => {
  return fs.readFileSync(path.join(directory, filename), 'utf8').trim();
};
