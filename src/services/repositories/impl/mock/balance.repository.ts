import db from '../../../../common/persistence/mock.persistence'
import { Balance } from '../../domain/balance';
import { BalanceRepository } from '../../balance.repository';

export class BalanceMockRepository implements BalanceRepository {

    public async all(): Promise<Balance[]> {
        const table = db.balances as Balance[];
        return Object.assign([...table]) as Balance[];
    }

    public async find(id: number): Promise<Balance | null> {
        const table = db.balances as Balance[];
        const result = table.find(balance => balance.id === id);

        if(result) return Object.assign({...result}) as Balance;

        return null;
    }

    public async findByUserId(userId: number): Promise<Balance | null> {
        const table = db.balances as Balance[];
        const result = table.find(balance => balance.user_id === userId);

        if(result) return Object.assign({...result}) as Balance;

        return null;
    }

    public async store(entry: Balance): Promise<void> {
        const table = db.balances as Balance[];
        const now = new Date();

        db._balanceId++;

        table.push({
            id: db._balanceId,
            user_id: entry.user_id,
            amount: entry.amount,
            created_at: now,
            updated_at: null
        } as Balance);
    }

    public async update(entry: Balance): Promise<void> {
        const table = db.balances as Balance[];
        const now = new Date();

        const balance = table.find(balance => balance.id === entry.id);

        if(balance) {
            balance.user_id = entry.user_id;
            balance.amount = entry.amount;
            balance.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.balances as Balance[];
        db.balances = table.filter(balance => balance.id !== id) as any;
    }

}