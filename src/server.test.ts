import supertest from 'supertest';
import { createServer } from './server';
describe('Server', () => {
  const app = createServer();
  it('should be true', (done) => {
    supertest(app).get('/healtcheck').expect('OK', done);
  });
});
