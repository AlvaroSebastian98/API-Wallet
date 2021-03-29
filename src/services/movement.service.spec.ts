import assert from 'assert';

import { MovementService } from './movement.service';
import { MovementMockRepository } from './repositories/impl/mock/movement.repository';
import { BalanceMockRepository } from './repositories/impl/mock/balance.repository';

import { MovementCreateDto } from '../dtos/movement.dto';
import { MovementType } from '../common/enums/movement-type';

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
);

describe('Movement.Service', () => {

    describe('Store', () => {
        it('tries to register an income movement', async () => {
            await movementService.store({
                user_id: 1,
                type: MovementType.income,
                amount: 200
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement', async () => {
            await movementService.store({
                user_id: 1,
                type: MovementType.outcome,
                amount: 200
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement with insufficient balance', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: MovementType.outcome,
                    amount: 200
                } as MovementCreateDto);
            } catch (error) {
                assert.strictEqual(error.message, 'User does not have enough balance.');
            }
        });

        it('tries to register un unexpected movement', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 12345,
                    amount: 200
                } as MovementCreateDto);
            } catch (error) {
                assert.strictEqual(error.message, 'Invalid movement type supplied')
            }
        });
    });

});