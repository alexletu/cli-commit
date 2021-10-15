export { parse };

const reShortMessage = /^-([a-zA-Z]*)m(.*)$/;
const reLongMessage = /^--message(=.*)?$/;

/**
 * Strip message declaration from git arguments
 */
function parse(rawGitArgs: string[]) {
  const result = [];
  let skipNext = false;

  for (const arg of rawGitArgs) {
    let match;

    if (skipNext) {
      skipNext = false;
      // eslint-disable-next-line no-continue
      continue;
    }
    match = reShortMessage.exec(arg);

    if (match) {
      if (match[1]) {
        result.push(`-${match[1]}`);
      }

      if (!match[2]) {
        skipNext = true;
      }

      // eslint-disable-next-line no-continue
      continue;
    }

    match = reLongMessage.exec(arg);

    if (match) {
      if (!match[1]) {
        skipNext = true;
      }
      // eslint-disable-next-line no-continue
      continue;
    }
    result.push(arg);
  }
  return result;
}
