import db from '../../../../common/persistence/mock.persistence'
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMockRepository implements MovementRepository {

    public async all(): Promise<Movement[]> {
        const table = db.movements as Movement[];
        return Object.assign([...table]) as Movement[];
    }

    public async find(id: number): Promise<Movement | null> {
        const table = db.movements as Movement[];
        const result = table.find(movement => movement.id === id);

        if(result) return Object.assign({...result}) as Movement;

        return null;
    }

    public async store(entry: Movement): Promise<void> {
        const table = db.movements as Movement[];
        const now = new Date();

        db._movementId++;

        table.push({
            id: db._movementId,
            type: entry.type,
            amount: entry.amount,
            user_id: entry.user_id,
            created_at: now,
            updated_at: null
        } as Movement)
    }

    public async update(entry: Movement): Promise<void> {
        const table = db.movements as Movement[];
        const now = new Date();

        const movement = table.find(movement => movement.id === entry.id);

        // por la mutabilidad, "movement" hace referencia al obejeto que se encuentra
        // dentro del array "movements" dentro del objet "db"
        if(movement) {
            movement.type = entry.type;
            movement.user_id = entry.user_id;
            movement.amount = entry.amount;
            movement.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        const table = db.movements as Movement[];
        db.movements = table.filter(movement => movement.id !== id) as any;
    }

}