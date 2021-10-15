import { exec } from 'child_process';

/**
 * Asynchrounously determines if the staging area is clean
 */
export function isClean(repoPath: string, done: (err?: unknown, result?: boolean) => unknown) {
  exec('git diff --no-ext-diff --name-only && git diff --no-ext-diff --cached --name-only', {
    maxBuffer: Infinity,
    cwd      : repoPath,
  }, function (error, stdout) {
    if (error) {
      return done(error);
    }
    const output = stdout || '';
    done(null, output.trim().length === 0);
    return undefined;
  });
}
