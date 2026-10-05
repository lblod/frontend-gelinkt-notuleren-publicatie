import Service, { service } from '@ember/service';
import { FastBootService } from 'ember-cli-fastboot';
import * as RDF from '@rdfjs/types';
import { optionMapOr } from 'frontend-gelinkt-notuleren-publicatie/utils/option';

export type QueryConfig = {
  query: string;
  endpoint: string;
  abortSignal?: AbortSignal;
};

export interface QueryResult<Binding = Record<string, RDF.Term>> {
  results: {
    bindings: Binding[];
  };
}

export default class QueryService extends Service {
  @service declare fastboot: FastBootService;

  async sparqlQuery<Binding = Record<string, RDF.Term>>({
    query,
    endpoint,
    abortSignal,
  }: QueryConfig) {
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
      return response.json() as Promise<QueryResult<Binding>>;
    } else {
      throw new Error(
        `Request to ${endpoint} was unsuccessful: [${response.status}] ${response.statusText}`,
      );
    }
  }

  async sparqlCountQuery(queryConfig: QueryConfig) {
    const response = await this.sparqlQuery(queryConfig);

    return optionMapOr(0, parseInt, response.results.bindings[0]?.count?.value);
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:fetch')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('fetch') declare altName: FetchService;`.
declare module '@ember/service' {
  interface Registry {
    query: QueryService;
  }
}
