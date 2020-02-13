import CONFIG from './config';
import express from 'express';
import expressWinston from 'express-winston';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import { ExpressLogger } from './log';
import { createTerminus } from '@godaddy/terminus';

export default class Express {
  constructor() {
    console.time('Initialize application server');
    this.server = express();

    this.server.use(bodyParser.json({ extended: true, limit: '50mb' }));
 
    this.server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    this.server.use(compression());
    this.server.use(cors());
    this.server.use(helmet());
    this.server.use(expressWinston.logger(ExpressLogger));
    this.server.use(expressWinston.errorLogger(ExpressLogger));
  }

  onSignal() {
    console.log('got terminate signals');
    return Promise.resolve();
  }

  onShutDown() {
    console.log('shutting down');
  }

  async onHealthCheck() {
    return Promise.resolve();
  }

  start() {
    const server = http.createServer(this.server);
    const opts = {
      timeout: 10000,
      signals: [ 'SIGINT', 'SIGTERM' ],
      onSignal: this.onSignal,
      onShutDown: this.onShutDown,
      healthChecks: {
        '/health-check': this.onHealthCheck,
      },
    }

    createTerminus(server, opts);
    server.listen(CONFIG.APP_PORT || 3030);
    console.timeEnd('Initialize application server');
  }
}