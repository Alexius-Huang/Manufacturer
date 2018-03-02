/*
 *  Traverse through object key-value pairs
 */

export default function traverseObjectPairs(obj, callback) {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const value = obj[key];
    callback(key, value, i);
  }
};
