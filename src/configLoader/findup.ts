import glob from 'glob';
import path from 'path';

interface Options {
  maxDepth?: number;
  nocase?: boolean;
  cwd?: string;
}
// Before, "findup-sync" package was used,
// but it does not provide filter callback
export default function findup(patterns: string[], options: Options, fn: (path: string) => boolean): string {
  let lastpath: string;
  let file: string;

  options = Object.create(options);
  options.maxDepth = 1;
  options.cwd = path.resolve(options.cwd);

  do {
    file = patterns.filter(function (pattern) {
      const configPath = glob.sync(pattern, options)[0];

      if (configPath) {
        return fn(path.join(options.cwd, configPath));
      }
      return false;
    })[0];

    if (file) {
      return path.join(options.cwd, file);
    }

    lastpath = options.cwd;
    options.cwd = path.resolve(options.cwd, '..');
  } while (options.cwd !== lastpath);

  throw new Error('Could not `findup`');
}
