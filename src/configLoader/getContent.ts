import fs                  from 'fs';
import isUTF8              from 'is-utf8';
import path                from 'path';
import stripBom            from 'strip-bom';
import stripJSONComments   from 'strip-json-comments';
import getNormalizedConfig from './getNormalizedConfig';

/**
 * Read the content of a configuration file
 * - if not js or json: strip any comments
 * - if js or json: require it
 * @param {String} configPath - full path to configuration file
 * @return {Object}
 */
function readConfigContent(configPath) {
  const parsedPath = path.parse(configPath);
  const isRcFile = parsedPath.ext !== '.js' && parsedPath.ext !== '.json';
  const jsonString = readConfigFileContent(configPath);
  const parse = isRcFile
    ? (contents) => JSON.parse(stripJSONComments(contents))
    : (contents) => JSON.parse(contents);

  try {
    const parsed = parse(jsonString);

    Object.defineProperty(parsed, 'configPath', {
      value: configPath,
    });

    return parsed;
  } catch (error) {
    error.message = [
      `Parsing JSON at ${configPath} for commitizen config failed:`,
      error.mesasge,
    ].join('\n');

    throw error;
  }
}

/**
 * Get content of the configuration file
 * @param {String} configPath - partial path to configuration file
 * @param {String} directory - directory path which will be joined with config argument
 * @return {Object}
 */
export default function getConfigContent(configPath: string, baseDirectory?: string) {
  if (!configPath) {
    return;
  }

  const resolvedPath = path.resolve(baseDirectory, configPath);
  const configBasename = path.basename(resolvedPath);

  if (!fs.existsSync(resolvedPath)) {
    return getNormalizedConfig(resolvedPath);
  }
  const content = readConfigContent(resolvedPath);
  return getNormalizedConfig(configBasename, content);
}

/**
 * Read proper content from config file.
 * If the chartset of the config file is not utf-8, one error will be thrown.
 * @param {String} configPath
 * @return {String}
 */
function readConfigFileContent(configPath) {
  const rawBufContent = fs.readFileSync(configPath);

  if (!isUTF8(rawBufContent)) {
    throw new Error(`The config file at "${configPath}" contains invalid charset, expect utf8`);
  }

  return stripBom(rawBufContent.toString('utf8'));
}
