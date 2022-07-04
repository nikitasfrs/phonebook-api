import http from 'http';
import net from 'net';
import { createServer } from './server';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

const app = createServer();
const server = http.createServer(app).listen({ host, port }, () => {
  const info = server.address() as net.AddressInfo;
  console.log(`Server ready at http://${info.address}:${info.port}`);
});
