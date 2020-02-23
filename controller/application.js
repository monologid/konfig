import ApplicationService from '../service/application';
import NamespaceService from '../service/namespace';

export default class ApplicationController {
  constructor() {}

  async get(req, res, next) {
    let applicationService = new ApplicationService({});
    
    let [err, applications] = await applicationService.getAll(req.query);
    if (err) {
      req.response = {
        statusCode: 500,
        error: err
      };
      return next();
    }
    
    req.response = {
      statusCode: 200,
      data: { applications }
    };
    next();
  }

  async create(req, res, next) {
    let applicationService = new ApplicationService({});
    let namespaceService = new NamespaceService({});
    
    let [err, application] = await applicationService.register(req.body);
    if (err) {
      req.response = {
        statusCode: 500,
        error: err
      };
      return next();
    }

    await namespaceService.create({ applicationId: application._id, name: 'default' });
    
    req.response = {
      statusCode: 200,
      data: { application }
    };
    next();
  }
}