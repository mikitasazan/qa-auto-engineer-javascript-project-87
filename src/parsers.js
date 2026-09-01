import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';

const parse = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, 'utf-8');
  const extension = path.extname(filepath).slice(1);

  switch (extension) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return load(content);
    default:
      throw new Error(`Unknown file extension: '${extension}'`);
  }
};

export default parse;
