import express from 'express';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import config from '../../common/config';
export class JwtMiddleware {
    verifyRefreshBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.refreshToken) {
            return next();
        } else {
            return res.status(400).send({error: 'Falta en body: refreshToken'});
        }
    };
    validRefreshNeeded(req: any, res: express.Response, next: express.NextFunction) {
        let b = Buffer.from(req.body.refreshToken, 'base64');
        let refreshToken = b.toString();
        let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.idUsuario + config.security.jwtSecret).digest("base64");
        if (hash === refreshToken) {
            delete req.jwt.iat;
            delete req.jwt.exp;
            req.body = req.jwt;
            return next();
        } else {
            return res.status(400).send({error: 'refresh token invalido'});
        }
    };


    validJWTNeeded(req: any, res: express.Response, next: express.NextFunction) {
        if (req.headers['authorization']) {
            try {
                let authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                } else {
                    req.jwt = jwt.verify(authorization[1], config.security.jwtSecret);
                    console.log(req.jwt);
                    next();
                }

            } catch (err) {
                return res.status(403).send();
            }
        } else {
            return res.status(401).send();
        }

    };
}
export default new JwtMiddleware();