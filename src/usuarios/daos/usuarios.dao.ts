import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { PutUsuarioDto } from '../dto/put.usuario.dto';
import {connectBD} from '../../common/services/conMysql';

class UsuariosDao {
    usuarios: Array<CreateUsuarioDto> = [];
    async addUsuario(usuario: CreateUsuarioDto) {
        var query="INSERT INTO usuarios SET ?";
        const cn=connectBD();
        let message:any;
        try {
            const rows:any= await cn.query(query,usuario);
            rows.affectedRows>0?
                message={message: "Usuario registrado"}
            :
             message={error: "Al guardar los datos del usuario"}
        } catch (err) {
            console.log(err);
            message={error: "Al guardar los datos del usuario"}
        }
        finally{
            cn.close();
        }
        return message;
    }
    async getUsuarios(limit: number, page: number) {
        var query="SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios ORDER BY Nombre DESC";
        if(limit>0&&page>0) query=query + ' LIMIT ? OFFSET ?';
        const cn=connectBD();
        try {
            const rows:any= await cn.query(query,[(limit*1),(page-1)*limit]);
            this.usuarios=rows;
        } catch (err) {
            console.log(err);
        }
        finally{
            cn.close();
        }
        return this.usuarios;
    }
    
    async getUsuarioById(usuarioId: number) {
        let usuario:any;
        var query="SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios WHERE id=?";
        const cn=connectBD();
        try {
            const row:any= await cn.query(query,usuarioId);
            if(row.length>0) usuario=row;
        } catch (err) {
            console.log(err);
        }
        finally{
            cn.close();
        }
        return usuario;
    }
    async putUsuarioById(usuarioId: number, usuario: PutUsuarioDto) {
        var query="UPDATE usuarios SET ? WHERE id=?";
        const cn=connectBD();
        let message:any;
        try {
            const rows:any= await cn.query(query, [usuario,usuarioId]);
            rows.affectedRows>0?
                message={message: "Se actualizo exitosamente"}
            :
             message={error: "Al actualizar los datos del usuario"}
        } catch (err) {
            message={error: "Al conectarse con la base de datos"}
        }
        finally{
            cn.close();
        }
        return message;
    }
    
    async removeUsuarioById(usuarioId: number) {
        let message:any;
        var query="DELETE FROM usuarios WHERE id=?";
        const cn=connectBD();
        try {
            const row:any= await cn.query(query,usuarioId);
            row.affectedRows>0 ?
                message={message: ` Usuario ${usuarioId} eliminado`}
                :
                message={error: `Al eliminar el usuario ${usuarioId}`}
        } catch (err) {
            message={error: "Al conectarse con la base de datos"}
        }
        finally{
            cn.close();
        }
        return message;
    }
    async getUsuarioByEmail(email: string) {
        let row:any;
        var query="SELECT id,email,nombre,apellidos,password,nivelPermiso FROM usuarios WHERE email=? LIMIT 1";
        const cn=connectBD();
        try {
            row= await cn.query(query,email);
        } catch (err) {
            console.log(err);
        }
        finally{
            cn.close();
        }
        return (row.length>0)? row[0]:null;
    }
}

export default new UsuariosDao();
