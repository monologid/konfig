import BaseRepository from './_base';

const collection = 'application';

export default class ApplicationRepository extends BaseRepository {
  constructor() { 
    super(collection);
  }
}