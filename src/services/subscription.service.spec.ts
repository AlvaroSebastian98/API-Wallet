import assert from 'assert';

import { SubscriptionService } from './subscription.service';
import { SubscriptionMockRepository } from './repositories/impl/mock/subscription.repository';

import { SubscriptionCreateDto } from '../dtos/subscription.dto';

const subscriptionService = new SubscriptionService(
    new SubscriptionMockRepository()
);

describe('Subscription.Service', () => {

    describe('Store', () => {
        it('tries to register a subscription', async () => {
            await subscriptionService.store({
                user_id: 1,
                amount: 200,
                code: 'MOVISTAR',
                cron: '122321'
            } as SubscriptionCreateDto);
        });

        it('tries to register a subscription that already exist', async () => {
            try {
                await subscriptionService.store({
                    user_id: 1,
                    amount: 200,
                    code: 'MOVISTAR',
                    cron: '122321'
                } as SubscriptionCreateDto);
            } catch (error) {
                assert.strictEqual(error.message, 'User subscription already exists.')
            }
        });
    })

})