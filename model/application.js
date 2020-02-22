import Error from '../const/error';
import StringUtil from '../util/string';

export default class ApplicationModel {
  constructor({ name, type = 'json', description = undefined }) {
    this.name = name;
    this.type = type;
    this.description = description;
  }

  validateName() {
    if (!this.name || (this.name && this.name.length < 3)) return Error.AppNameMinLength;
    this.slug = new StringUtil(this.name).generateSlug();
    return undefined;
  }

  toJSON() {
    return {
      name: this.name,
      slug: this.slug,
      type: this.type,
      description: this.description
    }
  }
}