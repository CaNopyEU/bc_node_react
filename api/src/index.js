// Imports
import express from 'express'
import isAuth from './middleware/is-auth'
import bodyParser from 'body-parser'

// App Imports
import setupLoadModules from './setup/loadModules'
import setupGraphQL from './setup/graphql'
import setupStartServer from './setup/startServer'
// Create express server
const server = express()

server.use(bodyParser.json());
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'x-access-token, Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

server.use(isAuth);

// Setup load modules
setupLoadModules(server)

// Setup GraphQL
setupGraphQL(server)

// Start server
setupStartServer(server)