import Database from '../core/database';
import uudv1 from 'uuid/v1';

export default class BaseRepository {
  constructor(collection) {
    this.db = (new Database()).get();
    this.collection = this.db.collection(collection);
  }

  async findById(id) {
    return await this.collection
      .findOne({ _id: id });
  }

  async find({ query }) {
    return await this.collection
      .findOne(query);
  }

  async findAll({ query, sort = {}, skip = 0, limit = 10 }) {
    return await this.collection
      .find(query)
      .sort(sort)
      .skip(0)
      .limit(limit)
      .toArray()
  }

  async insert({ params }) {
    params._id = uuidv1();
    return await this.collection.insertOne(params);
  }

  async update({ query, params, upsert = false, isMulti = false }) {
    if (isMulti) 
      return await this.collection.updateMany(query, { $set: params }, { upsert: isUpsert });
    
    return await this.collection.updateOne(query, { $set: params }, { upsert: isUpsert });
  }
}