import {Request,Response} from 'express';
import usuarioService from '../services/usuario.service';
import argon2  from 'argon2';
class UsuarioController {
    async addUsuario(req: Request, res: Response) {
        //req.body.nivelPermiso = 1 + 2 + 4 + 8;

        req.body.password = await argon2.hash(req.body.password);

        const {message,error}=await usuarioService.create(req.body);
        message? res.status(201).send(message) : res.status(400).send(error)
    }
    async updateUsuario(req: Request, res: Response) {
        const idUsuario:any = req.params.idUsuario;
        const {password,id}=req.body;
        if(password) req.body.password = await argon2.hash(password);
        if(id) delete req.body.id;
        const {message,error}=await usuarioService.updateById(idUsuario,req.body);
        message? res.status(201).send(message) : res.status(400).send(error)
    }
    async listUsuario(req: Request, res: Response) {
        const {page,limit}:any=req.query;
        const usuario = await usuarioService.list(limit||0, page||0);
        res.status(200).send(usuario);
    }
    async getUsuarioById(req: Request, res: Response) {
        const idUsuario:any = req.params.idUsuario
        const usuario = await usuarioService.readById(idUsuario);
        res.status(200).send(usuario);
    }
    async removeUsuario(req: Request, res: Response) {
        const idUsuario:any = req.params.idUsuario;
        const {message,error}=await usuarioService.deleteById(idUsuario);
        message? res.status(201).send(message) : res.status(400).send(error)
    }
}
export default new UsuarioController();