import { spawnSync } from 'child_process';

/**
 * Synchronously adds a path to git staging
 */
export function addPath(repoPath: string) {
  spawnSync('git', ['add', '.'], { cwd: repoPath });
}

/**
 * Synchronously adds a file to git staging
 */
export function addFile(repoPath: string, filename: string) {
  spawnSync('git', ['add', filename], { cwd: repoPath });
}
