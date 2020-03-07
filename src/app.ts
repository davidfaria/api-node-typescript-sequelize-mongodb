import './bootstrap';
import path from 'path';
import express, { Application } from 'express';
import helmet from 'helmet';

import cors from '@middlewares/cors';
import rateLimit from '@middlewares/rateLimit';

import database from './database';
import ROUTES from './routes';

class App {
  public server: Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.database();
    this.routes();
  }

  private middleware(): void {
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(cors);
    this.server.use(rateLimit);

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  private database(): void {
    new database();
  }

  private routes() {
    this.server.use(ROUTES);
  }
}

export default new App();
