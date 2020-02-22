import Error from '../const/error';
import StringUtil from '../util/string';

export default class Namespace {
  constructor({ applicationId = undefined, name, variable = {}}) {
    this.applicationId = applicationId;
    this.name = name;
    this.variable = variable;
  }

  validateApplicationId() {
    if (!this.applicationId) return Error.NamespaceAppIdIsMandatory;
    return undefined;
  }

  validateName() {
    if (!this.name || (this.name && this.name.length < 1)) return Error.NamespaceNameMinLength;
    return undefined;
  }

  toJSON() {
    return {
      applicationId: this.applicationId,
      name: this.name,
      variable: this.variable
    }
  }
}