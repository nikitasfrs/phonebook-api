import supertest from 'supertest';
import { createServer } from './server';
describe('Server', () => {
  const app = createServer();
  it('should run', (done) => {
    supertest(app).get('/').expect('OK', done);
  });
});
