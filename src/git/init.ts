import { spawnSync } from 'child_process';

/**
 * Synchronously creates a new git repo at a path
 */
export function init(repoPath: string) {
  spawnSync('git', ['init'], { cwd: repoPath });
}
