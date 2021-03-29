import db from '../../../../common/persistence/mock.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMockRepository implements SubscriptionRepository {

    public async all(): Promise<Subscription[]> {
        const table = db.subscriptions as Subscription[];
        return Object.assign([...table]) as Subscription[];
    }

    public async find(id: number): Promise<Subscription | null> {
        const table = db.subscriptions as Subscription[];
        const result = table.find(subscription => subscription.id === id);

        if(result) return Object.assign({...result}) as Subscription;

        return null;
    }

    public async findByUserAndCode(userId: number, code: string): Promise<Subscription | null> {
        const table = db.subscriptions as Subscription[];
        const result = table.find(subscription =>
            subscription.user_id === userId &&
            subscription.code === code
        );

        if(result) return Object.assign({...result}) as Subscription;

        return null;
    }

    public async store(entry: Subscription): Promise<void>{
        const table = db.subscriptions as Subscription[];
        const now = new Date();

        db._subscriptionId++;

        table.push({
            id: db._subscriptionId,
            code: entry.code,
            user_id: entry.user_id,
            amount: entry.amount,
            cron: entry.cron,
            created_at: now,
            updated_at: null
        } as Subscription);
    }

    public async update(entry: Subscription): Promise<void> {
        const table = db.subscriptions as Subscription[];
        const now = new Date();

        const subscription = table.find(subscription => subscription.id === entry.id);

        if(subscription) {
            subscription.code = entry.code;
            subscription.user_id = entry.user_id;
            subscription.amount = entry.amount;
            subscription.cron = entry.cron;
            subscription.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.subscriptions as Subscription[];
        db.subscriptions = table.filter(subscription => subscription.id !== id) as any;
    }

}