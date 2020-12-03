import fs from 'fs';

export default async (directory = '.'): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${directory}/input.txt`, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data.split('\n'));
    });
  });
};
