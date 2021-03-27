import express from 'express';
import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';

// MySQL Repositories
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';

// MSSQL Repositories
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';

import { SubscriptionService } from './services/subscription.service';
import { MovementService } from './services/movement.service';
import { TestService } from './services/test.service';


export default (app: express.Application): void => {

    const container = createContainer({
        injectionMode: 'CLASSIC' // injection from constructor
    });

    container.register({

        //* repositories
        subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        movementRepository: asClass(MovementMSSQLRepository).scoped(),
        balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        // subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        // movementRepository: asClass(MovementMySQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMySQLRepository).scoped(),

        //* services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));

};