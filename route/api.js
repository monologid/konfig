import ApplicationController from '../controller/application';
import NamespaceController from '../controller/namespace';
import Response from './response';

export default class ApiRouter {
  constructor(e) {
    const res = new Response();

    const applicationCtrl = new ApplicationController();
    const namespaceCtrl = new NamespaceController();

    e.get('/api/v1/application', applicationCtrl.get, res.sendJSON)
    e.post('/api/v1/application', applicationCtrl.create, res.sendJSON);

    e.get('/api/v1/namespace', namespaceCtrl.create, res.sendJSON);
    e.put('/api/v1/namespace/:namespace_id/variable', namespaceCtrl.updateVariable, res.sendJSON)
  }
}