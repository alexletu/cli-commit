import { loader } from '../configLoader';

export { load };

// Configuration sources in priority order.
const configs = ['.czrc', '.cz.json', 'package.json'];

function load(config, cwd) {
  return loader(configs, config, cwd);
}
