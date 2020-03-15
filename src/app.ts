import './bootstrap';
import path from 'path';
import express, { Application } from 'express';

/**
 *  Middlewares
 */
import helmet from 'helmet';
import cors from '@middlewares/cors';
import morgan from '@middlewares/morgan';
import rateLimit from '@middlewares/rateLimit';
import sendError from '@middlewares/sendError';

/**
 * Database
 */
import database from '@app/database';

/**
 *  Routes
 */
import ROUTES from '@app/routes';

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
    this.server.use(sendError);
    this.server.use(cors);
    this.server.use(morgan);
    this.server.use(rateLimit);

    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
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
