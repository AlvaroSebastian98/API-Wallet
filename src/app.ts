process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // development || production
process.env.APP_ENV = process.env.APP_ENV || 'development'; // development || staging || production


// Env files
import dotenv from 'dotenv';
dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
console.log(process.env.APP_FOO)

import express from 'express';
import loadContainer from './container';
import { loadControllers } from 'awilix-express'

const app: express.Application = express();

// JSON Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Container
loadContainer(app);

// Controllers: define controllers path
app.use(loadControllers('controllers/*.ts', {
    cwd: __dirname
}))

export { app };