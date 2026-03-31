import Route from '@ember/routing/route';
import { service } from '@ember/service';
import {
  executeQuery,
  sparqlEscapeUri,
  executeCountQuery,
} from 'frontend-gelinkt-notuleren-publicatie/utils/sparql';
import generateMeta from 'frontend-gelinkt-notuleren-publicatie/utils/generate-meta';

export default class BestuurseenheidReglementenReglementRoute extends Route {
  @service store;

  queryParams = {
    page: {
      refreshModel: true,
    },
    pageSize: {
      refreshModel: true,
    },
    sort: {
      refreshModel: true,
    },
  };

  async model(params) {
    const uittrekselId = params.uittreksel_id;
    const { page = 0, pageSize = 20 } = params;

    const uittreksel = await this.store.findRecord('uittreksel', uittrekselId, {
      include:
        'publication,behandeling-van-agendapunt,behandeling-van-agendapunt.besluiten',
    });

    const besluit = (
      await uittreksel.behandelingVanAgendapunt.get('besluiten')
    )[0];

    const sortFilter = this.buildSort(params.sort);
    const prefixes = `
      PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
      PREFIX eli: <http://data.europa.eu/eli/ontology#>
      PREFIX prov: <http://www.w3.org/ns/prov#>
      PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
      PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
      PREFIX dct: <http://purl.org/dc/terms/>
    `;

    const queryContent = `
      ?uri a besluit:Besluit;
            a ?besluitType;
            eli:title ?title;
            mu:uuid ?besluitId.
          ?bvap prov:generated ?uri.
          ?uittreksel ext:uittrekselBvap ?bvap;
            prov:wasDerivedFrom ?publishedResource.
          ?publishedResource dct:created ?publicationdate.
          {
            ?uri (ext:linkedDecision)+ ?originalBesluit.
          }
            UNION
          {
              ?originalBesluit mu:uuid ?besluitId.
          }
          {
            SELECT DISTINCT ?originalBesluit WHERE {
              ?originalBesluit a besluit:Besluit;
                a ?besluitTypeOriginal.
              ${sparqlEscapeUri(
                besluit.uri
              )} (ext:linkedDecision)+ ?originalBesluit
              FILTER NOT EXISTS {
                ?originalBesluit ext:linkedDecision ?linkedDecision.
              }
          }
        }
    `;

    const countQuery = `
      ${prefixes}
       SELECT (count( DISTINCT ?besluitId) as ?count) WHERE {
        ${queryContent}
      }
    `;
    const count = await executeCountQuery({
      query: countQuery,
      endpoint: '/raw-sparql',
    });
    const query = `
        ${prefixes}
        SELECT DISTINCT ?besluitId WHERE {
          ${queryContent}
        } ${sortFilter} LIMIT ${pageSize * (page + 1)} OFFSET ${pageSize * page}
    `;

    const queryResult = await executeQuery({
      query,
      endpoint: '/raw-sparql',
    });
    const besluitIds = queryResult.results.bindings.map(
      (binding) => binding.besluitId.value
    );

    const history = await this.store.query('besluit', {
      'filter[:id:]': besluitIds.join(','),
      include:
        'linked-decision,volgend-uit-behandeling-van-agendapunt.uittreksel.publication',
    });
    const historySorted = [...history].sort(
      (a, b) => besluitIds.indexOf(b.id) - besluitIds.indexOf(a.id)
    );

    const historyEnriched = await Promise.all(
      historySorted.map(async (historyBesluit) => {
        const bvap = await historyBesluit.volgendUitBehandelingVanAgendapunt;
        const uittreksel = await bvap.uittreksel;
        const publication = await uittreksel.publication;
        return {
          latest: besluit.uri === historyBesluit.uri,
          original: !(await historyBesluit.linkedDecision),
          besluit: historyBesluit,
          uittreksel,
          publication,
        };
      })
    );
    historyEnriched.meta = generateMeta(params, count);
    return {
      history: historyEnriched,
    };
  }
  buildSort(sort) {
    if (!sort) return '';
    let sortParameter;
    let sortDirection;
    if (sort.charAt(0) === '-') {
      sortParameter = sort.slice(1);
      sortDirection = 'DESC';
    } else {
      sortParameter = sort;
      sortDirection = 'ASC';
    }
    return `ORDER BY ${sortDirection}(?${sortParameter})`;
  }
}
