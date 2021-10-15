import fs from 'fs';
import _  from 'lodash';

export {
  getCacheValueSync,
  readCacheSync,
  setCacheValueSync,
};

/**
 * Reads the entire cache
 */
function readCacheSync(cachePath: string) {
  return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
}

/**
 * Sets a cache value and writes the file to disk
 */
function setCacheValueSync(cachePath: string, key: string, value) {
  let originalCache;
  try {
    originalCache = readCacheSync(cachePath);
  } catch (e) {
    originalCache = {};
  }
  const newCache = _.assign(originalCache, {
    [key]: value,
  });
  fs.writeFileSync(cachePath, JSON.stringify(newCache, null, '  '));
  return newCache;
}

/**
 * Gets a single value from the cache given a key
 */
function getCacheValueSync(cachePath: string, repoPath: string) {
  try {
    const cache = readCacheSync(cachePath);
    return cache[repoPath];
  } catch (e) {
    if (process.env.COMMITIZEN_DEBUG) {
      console.warn(e);
    }
  }
  return undefined;
}
