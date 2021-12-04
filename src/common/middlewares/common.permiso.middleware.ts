export class CommonPermisoMiddleware {
    public static MAXIMO_PERMISO = 16 * 2; //4096*2
    public static BASICO_PERMISO = 1;
    minimoPermisoRequerido(nivelPermisoRequerido: any) {
        return (req: any, res: any, next: any) => {
            try {
                let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
                if (usuarioNivelPermiso&Number.parseInt(nivelPermisoRequerido)) {
                    next();
                } else {
                    if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO)
                    {
                        next();
                    }else{
                        res.status(403).send({});
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
    };

    async mismoUsuarioOAdministrador(req: any, res: any, next: any) {
        let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
        let idUsuario = req.jwt.idUsuario;
        if (req.params && req.params.idUsuario && idUsuario === Number.parseInt(req.params.idUsuario)) {
            return next();
        } else {
            if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO) {
                return next();
            } else {
                return res.status(403).send({});
            }

        }
    };

    async soloAdministrador(req: any, res: any, next: any) {
        let usuarioNivelPermiso = parseInt(req.jwt.nivelPermiso);
        if (usuarioNivelPermiso & CommonPermisoMiddleware.MAXIMO_PERMISO) {
            return next();
        } else {
            return res.status(403).send({});
        }
    };
}