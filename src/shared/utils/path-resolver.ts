/* eslint-disable @typescript-eslint/no-explicit-any */
function setPath(object: any, path: string, value: any) {
  return path
    .split('.')
    .reduce(
      (o, p, i, arr) => (o[p] = arr.length === i + 1 ? value : o[p] || {}),
      object
    );
}

function resolvePath<T>(object: any, path: string, defaultValue = '#'): T {
  return path
    .split(/[.[\]'"]/)
    .filter(p => p)
    .reduce((o, p) => (o ? o[p] : defaultValue), object) as T;
}
export { setPath, resolvePath };
