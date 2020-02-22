import NamespaceService from '../service/namespace';

export default class NamespaceController {
  constructor() { }

  async create(req, res, next) {
    let namespaceService = new NamespaceService({});

    let [err, namespace] = await namespaceService.create(req.body);
    if (err) {
      req.response = {
        statusCode: 500,
        error: err
      };
      return next();
    }

    req.response = {
      statusCode: 200,
      data: { namespace }
    };
    next();
  }

  async updateVariable(req, res, next) {
    let namespaceService = new NamespaceService({});

    let params = {
      namespaceId: req.params.namespace_id,
      variable: req.body.variable
    };
    let [err, variable] = await namespaceService.updateVariable(params);
    if (err) {
      req.response = {
        statusCode: 500,
        error: err
      };
      return next();
    }

    req.response = {
      statusCode: 200,
      data: { variable }
    };
    next();
  }
}