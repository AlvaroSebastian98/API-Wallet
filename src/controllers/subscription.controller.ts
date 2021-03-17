import { Request, Response } from 'express'
import { route, GET, POST, PUT, DELETE } from 'awilix-express'
import { SubscriptionService } from '../services/subscription.service';
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto';
import { BaseController } from '../common/controllers/base.controller';

@route('/subscriptions')
export class DefaultController extends BaseController{

    constructor(private readonly subscriptionService: SubscriptionService){
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            const subscriptions = await this.subscriptionService.all();
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
            const subscription = await this.subscriptionService.find(id);

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
            const subscription = await this.subscriptionService.store({
                user_id: req.body.user_id,
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionCreateDto);

            res.json(subscription);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const subscription = await this.subscriptionService.update(id, {
                code: req.body.code,
                amount: req.body.amount,
                cron: req.body.cron
            } as SubscriptionUpdateDto);

            res.json(subscription);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            const subscription = await this.subscriptionService.remove(id);

            res.json(subscription);
        } catch (error) {
            this.handleException(error, res);
        }
    }


}