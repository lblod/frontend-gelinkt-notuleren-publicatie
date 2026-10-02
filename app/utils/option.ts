export type None = null | undefined;
export type Option<A> = A | None;

export function isSome<A>(thing: Option<A>): thing is A {
  return thing !== null && thing !== undefined;
}

export function isNone<A>(thing: Option<A>): thing is None {
  return !isSome(thing);
}

export function optionMapOr<A, U>(
  defaultValue: U,
  func: (thing: A) => U,
  thing: Option<A>,
): U {
  if (isSome(thing)) {
    return func(thing);
  }
  return defaultValue;
}
