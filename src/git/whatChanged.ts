import { exec } from 'child_process';

/**
 * Asynchronously gets the git whatchanged output
 */
export function whatChanged(repoPath, done) {
  exec('git whatchanged', {
    maxBuffer: Infinity,
    cwd      : repoPath,
  }, function (error, stdout) {
    if (error) {
      throw error;
    }
    done(stdout);
  });
}
