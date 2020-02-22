import Database from '../core/database';
import DateUtil from '../util/date';

export default class BaseRepository {
  constructor(collection) {
    this.db = (new Database()).get();
    this.collection = this.db.collection(collection);
    this.deletedAt = { $exists: false };
  }

  async findById(id) {
    return await this.collection
      .findOne({ _id: id, deletedAt: this.deletedAt });
  }

  async find({ query, sort = {} }) {
    query.deletedAt = this.deletedAt;
    return await this.collection
      .findOne(query);
  }

  async findAll({ query = {}, sort = {}, skip = 0, limit = 10 }) {
    query.deletedAt = this.deletedAt;
    return await this.collection
      .find(query)
      .sort(sort)
      .skip(0)
      .limit(limit)
      .toArray()
  }

  async insert(params) {
    const datetime = new DateUtil();
    const uuidv1 = require('uuid/v1');
    params._id = uuidv1();
    params.createdAt = datetime.toISOFormatString();
    params.updatedAt = datetime.toISOFormatString();
    return await this.collection.insertOne(params);
  }

  async update({ query, params, upsert = false, isMulti = false }) {
    query.deletedAt = this.deletedAt;
    params.updatedAt = datetime.toISOFormatString();
    if (isMulti) 
      return await this.collection.updateMany(query, { $set: params }, { upsert: isUpsert });
    
    return await this.collection.updateOne(query, { $set: params }, { upsert: isUpsert });
  }
}

export class MockRepository {
  constructor() { }

  async findById(id) {
    return {}
  }

  async find({ query, sort = {} }) {
    return {}
  }

  async findAll({ query, sort = {}, skip = 0, limit = 10 }) {
    return []
  }

  async insert(params) {
    return {}
  }

  async update({ query, params, upsert = false, isMulti = false }) {
    return {}
  }
}