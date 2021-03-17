import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express'
import { TestService } from './services/test.service';
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';


export default (app: express.Application) => {

    const container = createContainer({
        injectionMode: 'CLASSIC' // injection from constructor
    });

    container.register({
        // repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),

        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));

};