import Error from '../const/error';
import StringUtil from '../util/string';

export default class Environment {
  constructor({ applicationId = undefined, name, variable = {}}) {
    this.applicationId = applicationId;
    this.name = name;
    this.variable = variable;
  }

  validateApplicationId() {
    if (!this.applicationId) return Error.EnvAppIdIsMandatory;
    return undefined;
  }

  validateName() {
    if (!this.name || (this.name && this.name.length < 1)) return Error.EnvNameMinLength;
    return undefined;
  }

  toJSON() {
    return {
      applicationId: this.applicationId,
      name: this.name,
      description: this.description
    }
  }
}