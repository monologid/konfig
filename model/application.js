import Error from '../const/error';
import StringUtil from '../util/string';

export default class ApplicationModel {
  constructor({ name, description = undefined }) {
    this.name = name;
    this.slug = new StringUtil(this.name).generateSlug();
    this.description = description;
  }

  validateName() {
    if (this.name.length < 3) return Error.AppNameMinLength;
    return undefined;
  }

  toJSON() {
    return {
      name: this.name,
      slug: this.slug,
      description: this.description
    }
  }
}