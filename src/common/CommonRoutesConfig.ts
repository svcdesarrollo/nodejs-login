import {Router} from 'express';
export abstract class CommonRoutesConfig {
    public router:Router=Router();
    constructor() {
        this.configureRoutes();
    }
    abstract configureRoutes():void;
}