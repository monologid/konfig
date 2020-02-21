import ApplicationRepository from '../repository/application';
import ApplicationModel from '../model/application';
import Error from '../const/error';

export default class ApplicationService {
  constructor({ applicationRepository }) {
    this.applicationRepository = (applicationRepository) ? applicationRepository : new ApplicationRepository();
  }

  async register({ name, type, description }) {
    let applicationModel = new ApplicationModel({ name, description });
    let err = applicationModel.validateName();
    if (err) return [err];

    let application = await this.applicationRepository.findBySlug(applicationModel.slug);
    if (application && application.name) return [Error.AppNameIsExist]

    await this.applicationRepository.insert(applicationModel.toJSON());

    application = await this.applicationRepository.findBySlug(applicationModel.slug);
    return [undefined, application];
  }

  async getAll(params) {
    let applications = await this.applicationRepository.findAll(params);
    return [undefined, applications];
  }
}