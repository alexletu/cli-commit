import { exec } from 'child_process';

/**
 * Asynchronously gets the git log output
 */
export function log(repoPath: string, done: (output: string) => void) {
  exec('git log', {
    maxBuffer: Infinity,
    cwd      : repoPath,
  }, function (error, stdout) {
    if (error) {
      throw error;
    }
    done(stdout);
  });
}
