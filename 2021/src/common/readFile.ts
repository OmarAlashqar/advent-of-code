import fs from 'fs';
import path from 'path';

export default (filename: string, directory = 'input/'): string => {
  return fs.readFileSync(path.join(directory, filename), 'utf8').trim();
};
