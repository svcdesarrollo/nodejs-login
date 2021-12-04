import express from 'express';
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import config from '../../common/config';

export class AuthController {
    async createJWT(req: express.Request, res: express.Response) {
        try {
            let refreshId = req.body.idUsuario + config.security.jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, config.security.jwtSecret, {expiresIn: config.security.tokenExpiration});
            let b = Buffer.from(hash);
            let refreshToken = b.toString('base64');
            return res.status(201).send({accessToken: token, refreshToken: refreshToken});
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
export default new AuthController();