/** eslint-disable @typescript-eslint/no-unsafe-assignment @typescript-eslint/no-unsafe-return */
import Component from '@glimmer/component';
import { trackedTask } from 'ember-resources/util/ember-concurrency';
import { service } from '@ember/service';
import { task } from 'ember-concurrency';
import type Store from '@ember-data/store';
import AuButton from '@appuniversum/ember-appuniversum/components/au-button';
import AuLink from '@appuniversum/ember-appuniversum/components/au-link';
import type UittrekselModel from 'frontend-gelinkt-notuleren-publicatie/models/uittreksel';

type Sig = {
  Args: {
    zittingId: string;
    decisionElement: Element;
  };
};

export default class DecisionLinkComponent extends Component<Sig> {
  @service declare store: Store;

  fetchPublishedExtractTask = task(async () => {
    // @ts-expect-error No model types yet
    const uittreksels = await this.store.query('uittreksel', {
      'filter[behandeling-van-agendapunt][besluiten][:uri:]': this.decisionURI,
      'fields[uittreksels]': 'uri',
    });
    if (uittreksels.length) {
      // @ts-expect-error No model types yet
      return uittreksels[0] as UittrekselModel;
    } else {
      return null;
    }
  });

  publishedExtractData = trackedTask<UittrekselModel | null>(this, this.fetchPublishedExtractTask);

  get uittrekselId() {
    return this.publishedExtractData.value?.id;
  }
  get decisionURI() {
    return this.args.decisionElement.getAttribute('resource') as string;
  }
  get isLoading() {
    return this.publishedExtractData.isRunning;
  }

  <template>
    <div class="au-c-card__content au-u-margin-bottom-small">
      <div class="au-o-grid au-o-grid--small">
        <div class="au-o-grid__item au-u-1-4@medium">
          {{#if this.isLoading}}
            <AuButton
              @skin="primary"
              @icon="nav-right"
              @iconAlignment="right"
              @disabled={{true}}
              @loading={{true}}
            >
              Uittreksel opvragen
            </AuButton>
          {{else}}
            {{#if this.uittrekselId}}
              <AuLink
                @skin="primary"
                @route="bestuurseenheid.zittingen.zitting.uittreksels.detail"
                @model={{this.uittrekselId}}
                {{! @glint-expect-error }}
                property="lblodBesluit:linkToPublication"
                @icon="nav-right"
                @iconAlignment="right"
              >
                Bekijk volledige inhoud
              </AuLink>
            {{else}}
              <AuButton
                @skin="primary"
                @icon="nav-right"
                @iconAlignment="right"
                @disabled={{true}}
              >
                Volledige inhoud niet publiek
              </AuButton>
            {{/if}}
          {{/if}}
        </div>
      </div>
    </div>
  </template>
}
