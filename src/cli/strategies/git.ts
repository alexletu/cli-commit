import childProcess from 'child_process';

export default git;

// We don't have a config, so either we use raw args to try to commit
// or if debug is enabled then we do a strict check for a config file.
function git(rawGitArgs: string[], environment: Record<string, string | boolean | number>) {
  if (environment.debug === true) {
    console.error('COMMITIZEN DEBUG: No cz friendly config was detected. I looked for .czrc, .cz.json, or czConfig in package.json.');
  } else {
    const vanillaGitArgs = ['commit'].concat(rawGitArgs);

    const child = childProcess.spawn('git', vanillaGitArgs, {
      stdio: 'inherit',
    });

    child.on('error', function (e: unknown) {
      throw e;
    });
  }
}
