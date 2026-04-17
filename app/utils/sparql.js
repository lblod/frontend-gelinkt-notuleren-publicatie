export const sparqlEscapeString = (value) =>
  '"""' + value.replace(/[\\"]/g, (match) => '\\' + match) + '"""';

export const sparqlEscapeBool = (value) => {
  return value ? '"true"^^xsd:boolean' : '"false"^^xsd:boolean';
};

export const sparqlEscapeUri = (value) => {
  return (
    '<' +
    value.replace(/[\\"<>]/g, function (match) {
      return '\\' + match;
    }) +
    '>'
  );
};

export async function executeQuery({ query, endpoint, abortSignal }) {
  const encodedQuery = encodeURIComponent(query.trim());

  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/sparql-results+json',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: `query=${encodedQuery}`,
    signal: abortSignal,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(
      `Request to ${endpoint} was unsuccessful: [${response.status}] ${response.statusText}`
    );
  }
}
/**
 *
 * Converts a sparql binding to a simple object contain a mapping of the binding keys to their values
 */
export function bindingToObject(binding) {
  return Object.fromEntries(
    Object.entries(binding).map(([key, term]) => [key, term.value])
  );
}

export async function executeCountQuery(queryConfig) {
  const response = await executeQuery(queryConfig);

  return optionMapOr(0, parseInt, response.results.bindings[0]?.count.value);
}

export function optionMapOr(defaultValue, func, thing) {
  if (isSome(thing)) {
    return func(thing);
  }
  return defaultValue;
}

export function isSome(thing) {
  return thing !== null && thing !== undefined;
}
