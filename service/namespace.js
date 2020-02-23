import NamespaceRepository from '../repository/namespace';
import NamespaceModel from '../model/namespace';
import lo from 'lodash';
import Error from '../const/error';

export default class Namespace {
  constructor({ namespaceRepository }) {
    this.namespaceRepository = (namespaceRepository) ? namespaceRepository : new NamespaceRepository();
  }

  async create({ applicationId, name, variable }) {
    const namespaceModel = new NamespaceModel({ applicationId, name, variable });
    
    let err = namespaceModel.validateApplicationId();
    if (err) return [err];

    err = namespaceModel.validateName();
    if (err) return [err];

    await this.namespaceRepository.insert(namespaceModel.toJSON());

    return [undefined];
  }

  async updateVariable({ namespaceId, variable }) {
    let query = { _id: namespaceId };
    let params = { variable }

    await this.namespaceRepository.update({ query, params });

    const namespace = await this.namespaceRepository.findById(namespaceId);
    return [undefined, namespace.variable];
  }

  async mergeVariable({ sourceNamespaceId, targetNamespaceId }) {
    if (!sourceNamespaceId) return [Error.NamespaceSourceIdIsMandatory];
    if (!targetNamespaceId) return [Error.NamespaceTargetIdIsMandatory];

    let sourceNamespace = await this.namespaceRepository.findById(sourceNamespaceId);
    let targetNamespace = await this.namespaceRepository.findById(targetNamespaceId);

    const sourceVariable = (sourceNamespace && sourceNamespace.variable) ? sourceNamespace.variable : {};
    const targetVariable = (targetNamespace && targetNamespace.variable) ? targetNamespace.variable : {};
    const finalVariable = lo.merge(sourceVariable, targetVariable); 

    return [undefined, finalVariable];
  }
}