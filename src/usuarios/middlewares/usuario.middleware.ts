import {Request,Response,NextFunction} from 'express';
import usuarioService from '../services/usuario.service';

export class UsuariosMiddleware {
    private static instance: UsuariosMiddleware;

    static getInstance() {
        if (!UsuariosMiddleware.instance) {
            UsuariosMiddleware.instance = new UsuariosMiddleware();
        }
        return UsuariosMiddleware.instance;
    }

    validateRequiredCreateUsuarioBodyFields(req: Request, res: Response, next: NextFunction) {
        const {email,nombre,password}=req.body
        if (email&&password&&nombre) {
            next();
        } else {
            res.status(400).send({error: `Los campos email,nombre,password son obligatorios`});
        }
    }
    async validateSameEmailDoesntExist(req: Request, res: Response, next: NextFunction) {
        const usuario = await usuarioService.getUserByEmail(req.body.email);
        if (usuario) {
            res.status(400).send({error: `El email ya se encuentra registrado`});
        } else {
            next();
        }
    }
    async validatUsuarioExists(req: Request, res: Response, next: NextFunction) {
        const {idUsuario}:any=req.params;
        const usuario = await usuarioService.readById(idUsuario);
        if (usuario) {
            next();
        } else {
            res.status(404).send({error: `No se encontro registro del usuario`});
        }
    }
}