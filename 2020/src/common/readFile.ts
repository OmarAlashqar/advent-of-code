import fs from 'fs';
import path from 'path';

export default async (directory = '.', filename = 'input.txt'): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(directory, filename), 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
