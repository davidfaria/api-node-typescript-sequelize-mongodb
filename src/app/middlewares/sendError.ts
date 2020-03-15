import { Request, Response, NextFunction } from 'express';
import logger from '@lib/Logger';

export default async (req: Request, res: Response, next: NextFunction) => {
  res.sendError = function(message: string, status = 500) {
    logger.error({
      message,
      status,
      // date: new Date()
    });

    return this.status(status).send({
      error: message,
    });
  };

  next();
};
