process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // development || production
process.env.APP_ENV = process.env.APP_ENV || 'development'; // development || staging || production


// Env files
import dotenv from 'dotenv';
dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});
console.log(process.env.APP_FOO);

import express from 'express';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import jwt from 'express-jwt';
import cors from 'cors';

const app: express.Application = express();

// CORS
app.use(cors());

// JSON Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Container
loadContainer(app);

// JWT Middleware
if (process.env.JWT_SECRET_KEY) {
    app.use(jwt({
        secret: process.env.JWT_SECRET_KEY,
        algorithms: ['HS256']
    }).unless({path: ['/', '/check']}));
}

// Controllers: define controllers path
app.use(loadControllers(`controllers/*.${process.env.NODE_ENV === 'production' ?
                        'js' : 'ts'}`, {
    cwd: __dirname
}));

export { app };