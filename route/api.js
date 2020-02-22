import ApplicationController from '../controller/application';
import Response from './response';

export default class ApiRouter {
  constructor(e) {
    const res = new Response();
    const appCtrl = new ApplicationController();

    e.route('/api/v1/application')
      .get(appCtrl.get, res.sendJSON)
      .post(appCtrl.create, res.sendJSON);
  }
}