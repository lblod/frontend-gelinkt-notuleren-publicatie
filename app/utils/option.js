export function isSome(thing) {
  return thing !== null && thing !== undefined;
}

export function isNone(thing) {
  return !isSome(thing)
}
