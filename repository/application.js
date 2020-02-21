import BaseRepository from './_base';

const collection = 'application';

export default class ApplicationRepository extends BaseRepository {
  constructor() { 
    super(collection);
  }

  async findBySlug(slug) {
    return await this.collection
      .findOne({ slug: slug, deletedAt: this.deletedAt });
  }
}
