import BaseRepository from './_base';

const collection = 'namespace';

export default class NamespaceRepository extends BaseRepository {
  constructor() { 
    super(collection);
  }

  async findByApplicationId(applicationId) {
    return await this.collection
      .findOne({ applicationId: applicationId, deletedAt: this.deletedAt });
  }
}
