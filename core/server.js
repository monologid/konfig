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

import ApiRouter from '../route/api';

export default class Express {
  constructor() {
    console.time('Initialize application server');
    this.app = express();

    this.app.use(bodyParser.json({ extended: true, limit: '50mb' }));
 
    this.app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(expressWinston.logger(ExpressLogger));
    this.app.use(expressWinston.errorLogger(ExpressLogger));

    this.server = http.createServer(this.app);
  }

  initiateRouter() {
    console.time('Initialize application router');
    new ApiRouter(this.app);
    console.timeEnd('Initialize application router');
  }

  onSignal() {
    console.time('Shutting down server');
    this.server.close(() => {
      if (!process.env.NODE_ENV) return process.exit(1);
      console.timeEnd('Shutting down server');
      process.exit();
      Promise.resolve();
    });
  }

  onShutDown() {
    console.log('shutting down');
  }

  async onHealthCheck() {
    return Promise.resolve();
  }

  start() {
    const opts = {
      timeout: 10000,
      signals: [ 'SIGTERM' ],
      onSignal: this.onSignal,
      onShutDown: this.onShutDown,
      healthChecks: {
        '/health-check': this.onHealthCheck,
      },
    }

    createTerminus(this.server, opts);
    this.initiateRouter();
    this.server.listen(CONFIG.APP_PORT || 3030);
    console.timeEnd('Initialize application server');
    console.log(`KONFIG started at :${CONFIG.APP_PORT || 3030}`);
  }
}