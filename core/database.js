import CONFIG from './config';
import ERROR from '../const/error';
import { Log } from './log';
import { MongoClient } from 'mongodb';

let client;

export default class Database {
  constructor() {
    this.uri = CONFIG.DATABASE_URI;
    this.opts = { useUnifiedTopology: true };
    this.client = new MongoClient(this.uri, this.opts);
  }

  async initialize() {
    console.time('Initialize database connection');
    
    try {
      client = await this.client.connect();  
    } catch (e) {
      Log.error(ERROR.DbFailedToConnect);
      Log.error(e);
      process.exit(1);
    }
    
    console.timeEnd('Initialize database connection');
  }

  get() {
    return client.db(CONFIG.DATABASE_NAME)
  }

  async close() {
    try {
      await client.close();  
    } catch (e) {
      Log.error(ERROR.DbFailedToCloseConnection);
      Log.error(e);
    }
  }
}