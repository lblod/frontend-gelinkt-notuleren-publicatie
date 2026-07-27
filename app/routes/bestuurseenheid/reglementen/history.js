import Route from '@ember/routing/route';
import { service } from '@ember/service';
import {
  executeQuery,
  sparqlEscapeUri,
  executeCountQuery,
} from 'frontend-gelinkt-notuleren-publicatie/utils/sparql';
import generateMeta from 'frontend-gelinkt-notuleren-publicatie/utils/generate-meta';
import buildSort from 'frontend-gelinkt-notuleren-publicatie/utils/build-sort';

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

    const sortFilter = buildSort(params.sort);
    const prefixes = `
      PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
      PREFIX eli: <http://data.europa.eu/eli/ontology#>
      PREFIX prov: <http://www.w3.org/ns/prov#>
      PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
      PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
      PREFIX dct: <http://purl.org/dc/terms/>
    `;

    // The aim of this query is to get all the besluits linked to the original besluit of the requested resource.
    // In order to do this we first make a subquery for the original besluit, and then we match that the besluit is indeed linked to it
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
            ?uri (eli:consolidates)+ ?originalBesluit.
          }
            UNION
          {
              ?originalBesluit mu:uuid ?besluitId.
          }
          {
            SELECT DISTINCT ?originalBesluit WHERE {
              ?originalBesluit a besluit:Besluit;
                mu:uuid ?originalBesluitId;
                a ?besluitTypeOriginal.
              {
                ${sparqlEscapeUri(
                  besluit.uri
                )} (eli:consolidates)+ ?originalBesluit
              }
                UNION
              {

                ${sparqlEscapeUri(besluit.uri)} mu:uuid ?originalBesluitId.
              }
              FILTER NOT EXISTS {
                ?originalBesluit eli:consolidates ?linkedDecision.
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
          original: !(await historyBesluit.linkedDecision),
          besluit: historyBesluit,
          uittreksel,
          publication,
        };
      })
    );
    let latestHistoryEntry = historyEnriched[0];

    for (let historyEntry of historyEnriched) {
      if (
        historyEntry.publication.createdOn >
        latestHistoryEntry.publication.createdOn
      ) {
        latestHistoryEntry = historyEntry;
      }
    }

    latestHistoryEntry.latest = true;

    historyEnriched.meta = generateMeta(params, count);
    return {
      history: historyEnriched,
    };
  }
}
