import express from 'express';
import usuarioService from '../../usuarios/services/usuario.service';
import argon2 from 'argon2';

export class AuthMiddleware {

    async validateBodyRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(req.body && req.body.email && req.body.password){
            next();
        }else{
            res.status(400).send({error: 'Los campos email y password son requeridos'});
        }
    }
    async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
        const usuario:any = await usuarioService.getUserByEmail(req.body.email);
        if (usuario) {
            let passwordHash = usuario.password;
            try {
                if (await argon2.verify(passwordHash, req.body.password)) {
                    req.body = {
                        idUsuario: usuario.id,
                        email: usuario.email,
                        provider: 'email',
                        nivelPermiso: usuario.nivelPermiso,
                    };
                    return next();
                } else {
                    res.status(400).send({errors: `Contraseña incorrecta`});
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(400).send({errors: `El correo electronico, no se encuentra registrado`});
        }
    }

}
export default new AuthMiddleware();