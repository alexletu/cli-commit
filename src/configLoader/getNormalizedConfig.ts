// Given a config and content, plucks the actual
// settings that we're interested in

type PackageJSON = {
  config: {
    commitizen?: Config
  }
};

type Config = {
  path: string;
};

export default function getNormalizedConfig(config: string, content?: PackageJSON | Config): Config {
  if (content && ('config' in content) && (config === 'package.json')) {
    // Use the npm config key, be good citizens
    if (content.config && content.config?.commitizen) {
      return content.config.commitizen;
    }
  } else if ('path' in content) {
    return content;
  }
  return undefined;
}
