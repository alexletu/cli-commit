import childProcess      from 'child_process';
import detectIndent      from 'detect-indent';
import findNodeModules   from 'find-node-modules';
import fs                from 'fs';
import _                 from 'lodash';
import path, { join }    from 'path';
import { isFunction }    from '../common/util';

export {
  addPathToAdapterConfig,
  getNearestNodeModulesDirectory,
  getNearestProjectRootDirectory,
  getNpmInstallStringMappings,
  getPrompter,
  generateNpmInstallAdapterCommand,
  resolveAdapterPath,
  getYarnAddStringMappings,
  generateYarnAddAdapterCommand,
  getGitRootPath,
};

/**
 * Modifies the package.json, sets config.commitizen.path to the path of the adapter
 * Must be passed an absolute path to the cli's root
 */
function addPathToAdapterConfig(_cliPath, repoPath: string, adapterNpmName: string) {
  const commitizenAdapterConfig = {
    config: {
      commitizen: {
        path: `./node_modules/${adapterNpmName}`,
      },
    },
  };

  const packageJsonPath = path.join(getNearestProjectRootDirectory(repoPath), 'package.json');
  const packageJsonString = fs.readFileSync(packageJsonPath, 'utf-8');
  const indent = detectIndent(packageJsonString).indent || '  ';
  const packageJsonContent = JSON.parse(packageJsonString);
  let newPackageJsonContent = '';
  if (_.get(packageJsonContent, 'config.commitizen.path') !== adapterNpmName) {
    newPackageJsonContent = _.merge(packageJsonContent, commitizenAdapterConfig);
  }
  fs.writeFileSync(packageJsonPath, `${JSON.stringify(newPackageJsonContent, null, indent)}\n`);
}

/**
 * Generates an npm install command given a map of strings and a package name
 */
function generateNpmInstallAdapterCommand(stringMappings, adapterNpmName) {
  // Start with an initial npm install command
  let installAdapterCommand = `npm install ${adapterNpmName}`;

  // Append the neccesary arguments to it based on user preferences
  for (const value of stringMappings.values()) {
    if (value) {
      installAdapterCommand = `${installAdapterCommand} ${value}`;
    }
  }

  return installAdapterCommand;
}

/**
 * Generates an yarn add command given a map of strings and a package name
 */
function generateYarnAddAdapterCommand(stringMappings, adapterNpmName) {
  // Start with an initial yarn add command
  let installAdapterCommand = `yarn add ${adapterNpmName}`;

  // Append the necessary arguments to it based on user preferences
  for (const value of stringMappings.values()) {
    if (value) {
      installAdapterCommand = `${installAdapterCommand} ${value}`;
    }
  }

  return installAdapterCommand;
}

/**
 * Gets the nearest npm_modules directory
 */
function getNearestNodeModulesDirectory(options: Record<string, string | number | boolean>) {
  // Get the nearest node_modules directories to the current working directory
  const nodeModulesDirectories = findNodeModules(options);

  /* istanbul ignore else */
  if (nodeModulesDirectories && nodeModulesDirectories.length > 0) {
    return nodeModulesDirectories[0];
  }

  throw new Error('Error: Could not locate node_modules in your project\'s root directory. Did you forget to npm init or npm install?');
}

/**
 * Gets the nearest project root directory
 */
function getNearestProjectRootDirectory(repoPath: string, options?: Record<string, string | number | boolean>) {
  return path.join(repoPath, getNearestNodeModulesDirectory(options), '/../');
}

/**
 * Gets a map of arguments where the value is the corresponding npm strings
 */
function getNpmInstallStringMappings(save, saveDev, saveExact, force) {
  return new Map()
    .set('save', (save && !saveDev) ? '--save' : undefined)
    .set('saveDev', saveDev ? '--save-dev' : undefined)
    .set('saveExact', saveExact ? '--save-exact' : undefined)
    .set('force', force ? '--force' : undefined);
}

/**
 * Gets a map of arguments where the value is the corresponding yarn strings
 */
function getYarnAddStringMappings(dev, exact, force) {
  return new Map()
    .set('dev', dev ? '--dev' : undefined)
    .set('exact', exact ? '--exact' : undefined)
    .set('force', force ? '--force' : undefined);
}

/**
 * Gets the prompter from an adapter given an adapter path
 */
function getPrompter(adapterPath: string) {
  // Load the adapter
  // eslint-disable-next-line global-require
  const adapter = require('./cz-emoji');

  /* istanbul ignore next */
  if (adapter && adapter.prompter && isFunction(adapter.prompter)) {
    return adapter.prompter;
  } if (adapter && adapter.default && adapter.default.prompter && isFunction(adapter.default.prompter)) {
    return adapter.default.prompter;
  }
  throw new Error(`Could not find prompter method in the provided adapter module: ${adapterPath}`);
}

/**
 * Given a resolvable module name or path, which can be a directory or file, will
 * return a located adapter path or will throw.
 */
function resolveAdapterPath() {
  return join(__dirname, 'cz-emoji');
}

function getGitRootPath() {
  return childProcess.spawnSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).stdout.trim();
}
