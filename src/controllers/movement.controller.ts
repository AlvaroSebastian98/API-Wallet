import { Request, Response } from 'express'
import { route, GET, POST} from 'awilix-express'
import { MovementService } from '../services/movement.service';
import { BaseController } from '../common/controllers/base.controller';
import { MovementCreateDto } from '../dtos/movement.dto';

@route('/movements')
export class MovementController extends BaseController{

    constructor(private readonly movementService: MovementService){
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            const subscriptions = await this.movementService.all();
            res.json(subscriptions);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const subscription = await this.movementService.find(id);

            if(subscription) {
                res.json(subscription);
            } else {
                res.status(404).json(subscription);
            }

        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            const subscription = await this.movementService.store({
                user_id: req.body.user_id,
                type: parseInt(req.body.type),
                amount: parseFloat(req.body.amount),
            } as MovementCreateDto);

            res.json(subscription);
        } catch (error) {
            this.handleException(error, res);
        }
    }

}