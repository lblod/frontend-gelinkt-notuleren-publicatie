declare module 'ember-cli-fastboot' {
  import Service from '@ember/service';

  export class FastBootService extends Service {
    isFastBoot: boolean;
    request: {
      method: string;
      path: string;
      protocol: string;
      _host: () => string;
      // TODO these need to be defined if we want to use them
      body: object;
      cookies: object;
      headers: object;
      queryParams: object;
    };
    response: {
      statusCode: number;
      headers: object;
    };
  }
}

declare const FastBoot:
  | undefined
  | {
      // The return here is a cheat as we only use it to get node-fetch...
      require: (mod: string) => typeof fetch;
    };
