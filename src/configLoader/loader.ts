import path                   from 'path';
import { isInTest }           from '../common/util';
import  findup                from './findup';
import  getContent            from './getContent';

/**
 * Get content of the configuration file
 * @param {String} config - partial path to configuration file
 * @param {String} [cwd = process.cwd()] - directory path which will be joined with config argument
 * @return {Object|undefined}
 */
export default function loader(configs: string[], config: string, cwd: string): Record<string, string> {
  let content: Record<string, string>;
  const directory = cwd || process.cwd();

  // If config option is given, attempt to load it
  if (config) {
    return getContent(config, directory);
  }

  content = getContent(
    findup(configs, { nocase: true, cwd: directory }, function (configPath) {
      if (path.basename(configPath) === 'package.json') {
        // return !!this.getContent(configPath);
      }
      return true;
    }),
  );

  if (content) {
    return content;
  }
  /* istanbul ignore if */
  if (!isInTest()) {
    // Try to load standard configs from home dir
    const directoryArr = [process.env.USERPROFILE, process.env.HOMEPATH, process.env.HOME];
    for (let i = 0, dirLen = directoryArr.length; i < dirLen; i++) {
      if (!directoryArr[i]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      for (let j = 0, len = configs.length; j < len; j++) {
        content = getContent(configs[j], directoryArr[i]);

        if (content) {
          return content;
        }
      }
    }
  }
  return {};
}
