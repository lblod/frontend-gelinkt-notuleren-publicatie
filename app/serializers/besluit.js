import ApplicationSerializer from './application';

export default class BesluitSerializer extends ApplicationSerializer {
  /**
      Parse the links in the JSONAPI response and convert to a meta-object
  */
  normalizeResponse(store, clazz, payload) {
    const result = super.normalizeResponse(...arguments);
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }
    if (payload.meta) {
      result.meta.count = payload.meta.count;
    }
    return result;
  }

  /**
     Transforms link URLs to objects containing metadata
     E.g.
     {
         previous: '/streets?page[number]=1&page[size]=10&sort=name
         next: '/streets?page[number]=3&page[size]=10&sort=name
     }
     will be converted to
     {
         previous: { number: 1, size: 10 },
         next: { number: 3, size: 10 }
     }
   */
  createPageMeta(data) {
    let meta = {};

    Object.keys(data).forEach((type) => {
      const link = data[type];
      meta[type] = {};

      if (link) {
        //extracts from '/path?foo=bar&baz=foo' the string: foo=bar&baz=foo
        const query = link.split(/\?(.+)/)[1] || '';

        query.split('&').forEach((pairs) => {
          const [param, value] = pairs.split('=');

          if (decodeURIComponent(param) === 'page[number]') {
            meta[type].number = parseInt(value);
          } else if (decodeURIComponent(param) === 'page[size]') {
            meta[type].size = parseInt(value);
          }
        });
      }
    });

    return meta;
  }
}
