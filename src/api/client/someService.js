import Service from '../abstract/service.js';

export default class SomeService extends Service {
  constructor() {
    super(process.env.VUE_APP_SOME_SERVICE_URL);
  }
}
