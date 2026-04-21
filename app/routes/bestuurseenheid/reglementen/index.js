import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import BESLUIT_TYPES from 'frontend-gelinkt-notuleren-publicatie/utils/besluit-types';
import {
  executeQuery,
  sparqlEscapeUri,
  executeCountQuery,
  sparqlEscapeString,
} from 'frontend-gelinkt-notuleren-publicatie/utils/sparql';
import generateMeta from 'frontend-gelinkt-notuleren-publicatie/utils/generate-meta';
import buildSort from 'frontend-gelinkt-notuleren-publicatie/utils/build-sort';

const DECISION_TYPES_TO_LINK = [
  BESLUIT_TYPES['Reglementen en verordeningen'],
  BESLUIT_TYPES['Rechtspositieregeling (RPR)'],
  BESLUIT_TYPES['Meerjarenplan(aanpassing)'],
  BESLUIT_TYPES['Jaarrekening PEVA'],
  BESLUIT_TYPES['Oprichting autonoom bedrijf'],
  BESLUIT_TYPES['Oprichting of deelname EVA'],
  BESLUIT_TYPES['Oprichting IGS'],
  BESLUIT_TYPES['Oprichting districtsbestuur'],
  BESLUIT_TYPES['Retributiereglement'],
  BESLUIT_TYPES['Personeelsreglement'],
  BESLUIT_TYPES[
    'Aanvullend reglement op het wegverkeer m.b.t. gemeentewegen in speciale beschermingszones'
  ],
  BESLUIT_TYPES['Gebruikersreglement'],
  BESLUIT_TYPES['Belastingreglement'],
  BESLUIT_TYPES['Contantbelasting'],
  BESLUIT_TYPES['Aanvullende belasting of opcentiem'],
  BESLUIT_TYPES['Kohierbelasting'],
  BESLUIT_TYPES['Huishoudelijk reglement'],
  BESLUIT_TYPES['Deontologische Code'],
  BESLUIT_TYPES['Reglement Onderwijs'],
  BESLUIT_TYPES['Subsidie, premie, erkenning'],
  BESLUIT_TYPES['Tijdelijke politieverordening (op het wegverkeer)'],
  BESLUIT_TYPES[
    'Aanvullend reglement op het wegverkeer m.b.t. gemeentewegen in havengebied'
  ],
  BESLUIT_TYPES['Politiereglement'],
  BESLUIT_TYPES[
    'Aanvullend reglement op het wegverkeer enkel m.b.t. gemeentewegen (niet in havengebied of speciale beschermingszones)'
  ],
  BESLUIT_TYPES['Delegatiereglement'],
  BESLUIT_TYPES['Andere'],
  BESLUIT_TYPES[
    'Aanvullend reglement op het wegverkeer m.b.t. één of meerdere gewestwegen'
  ],
];

export default class BestuurseenheidReglementenIndexRoute extends Route {
  @service store;
  @service fastboot;

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
    searchValue: {
      refreshModel: true,
    },
  };

  @action
  loading(transition) {
    // eslint-disable-next-line ember/no-controller-access-in-routes
    let controller = this.controllerFor('bestuurseenheid.reglementen.index');
    controller.set('isLoadingModel', true);

    transition.finally(function () {
      controller.set('isLoadingModel', false);
    });
  }

  async model(params) {
    const bestuurseenheid = this.modelFor('bestuurseenheid');

    const { page = 0, pageSize = 20, searchValue } = params;
    const sortFilter = buildSort(params.sort);
    let searchFilter = '';
    if (searchValue) {
      searchFilter = `FILTER(CONTAINS(LCASE(?title), ${sparqlEscapeString(
        searchValue.toLowerCase()
      )}))`;
    }
    const prefixes = `
      PREFIX besluit: <http://data.vlaanderen.be/ns/besluit#>
      PREFIX eli: <http://data.europa.eu/eli/ontology#>
      PREFIX prov: <http://www.w3.org/ns/prov#>
      PREFIX ext: <http://mu.semte.ch/vocabularies/ext/>
      PREFIX mu: <http://mu.semte.ch/vocabularies/core/>
      PREFIX dct: <http://purl.org/dc/terms/>
      PREFIX mandaat: <http://data.vlaanderen.be/ns/mandaat#>
    `;

    //The aim of this query is to get all the publication that are either the latest version of a tree of besluits or a single besluit with no linked versions
    // In order to do this, we use a subquery getting every original besluit and their latest publication date so we can match that when we try to get all the
    // leafs of the besluit tree of that original besluit.
    const queryContent = `
        ?adminUnitGeneral besluit:bestuurt ${sparqlEscapeUri(
          bestuurseenheid.uri
        )}.
        VALUES ?besluitType { ${DECISION_TYPES_TO_LINK.map(
          sparqlEscapeUri
        ).join(' ')}}
       ?uri a besluit:Besluit;
          a ?besluitType;
          eli:title ?title.
        ?bvap prov:generated ?uri.
        ?uittreksel ext:uittrekselBvap ?bvap;
          mu:uuid ?uittrekselId;
          prov:wasDerivedFrom ?publishedResource.
        ?publishedResource dct:created ?publicationdate.
        ?zitting ext:uittreksel ?uittreksel;
          besluit:isGehoudenDoor ?adminUnit.
        ?adminUnit mandaat:isTijdspecialisatieVan ?adminUnitGeneral.
        FILTER NOT EXISTS {
          ?linkedBesluit eli:consolidates ?uri.
        }
        {
    		  ?uri (eli:consolidates)+ ?originalBesluit.
          {
            SELECT DISTINCT ?originalBesluit (MAX(?publicationdate) AS ?maxDate) WHERE {
              ?originalBesluit a besluit:Besluit;
                a ?besluitTypeOriginal.
              FILTER NOT EXISTS {
                ?originalBesluit eli:consolidates ?linkedDecision.
              }
              ?uri (eli:consolidates)+ ?originalBesluit.
              ?bvap prov:generated ?uri.
              ?uittreksel ext:uittrekselBvap ?bvap;
                mu:uuid ?uittrekselId;
                prov:wasDerivedFrom ?publishedResource.
              ?publishedResource dct:created ?publicationdate.
              } GROUP BY (?originalBesluit)
            }
  		  } UNION
        {
          FILTER NOT EXISTS {
            ?uri eli:consolidates ?linkedDecision.
          }
          BIND(?publicationdate AS ?maxDate)
        }

        FILTER(!bound(?maxDate) || ?maxDate = ?publicationdate)


        ${searchFilter}

    `;

    const countQuery = `
      ${prefixes}
       SELECT (count( DISTINCT ?uittrekselId) as ?count) WHERE {
        ${queryContent}
      }
    `;
    const count = await executeCountQuery({
      query: countQuery,
      endpoint: '/raw-sparql',
    });
    let uittrekselsSync;
    if (count !== 0) {
      const query = `
          ${prefixes}
          SELECT DISTINCT ?uittrekselId WHERE {
            ${queryContent}
          } ${sortFilter} LIMIT ${pageSize * (page + 1)} OFFSET ${
        pageSize * page
      }
      `;

      const queryResult = await executeQuery({
        query,
        endpoint: '/raw-sparql',
      });
      const uittrekselIds = queryResult.results.bindings.map(
        (binding) => binding.uittrekselId.value
      );
      const uittreksels = await this.store.query('uittreksel', {
        include: 'behandeling-van-agendapunt.besluiten,publication',
        'filter[:id:]': uittrekselIds.join(','),
      });
      uittrekselsSync = await Promise.all(
        uittreksels.map(async (uittreksel) => {
          const bvap = await uittreksel.behandelingVanAgendapunt;
          const besluit = (await bvap.besluiten)[0];
          const publication = await uittreksel.publication;
          return {
            id: uittreksel.id,
            publication: publication,
            bvap,
            besluit,
          };
        })
      );
      uittrekselsSync.sort(
        (a, b) => uittrekselIds.indexOf(b.id) - uittrekselIds.indexOf(a.id)
      );
    } else {
      uittrekselsSync = [];
    }

    uittrekselsSync.meta = generateMeta(params, count);
    return { bestuurseenheid, uittreksels: uittrekselsSync };
  }
}
