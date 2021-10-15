import minimist from 'minimist';

export { parse };

function parse(rawGitArgs) {
  const args = minimist(rawGitArgs, {
    boolean: true,
  });
  return args;
}
