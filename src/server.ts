import express from 'express';
import cors from 'cors';
import contactsRouter from './routes/contacts';
import { logErrors } from './util';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  app.disable('x-powered-by');

  // Placeholder
  app.get('/', (_req, res) => {
    res.send('OK');
  });

  app.use('/contacts', contactsRouter);

  app.use(logErrors);

  return app;
};

export { createServer };
