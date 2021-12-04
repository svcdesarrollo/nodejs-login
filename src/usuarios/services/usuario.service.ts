import UsuariosDao from '../daos/usuarios.dao';
import { CreateUsuarioDto } from '../dto/create.usuario.dto';
import { PutUsuarioDto } from '../dto/put.usuario.dto';
import { CRUD } from '../../common/interfaces/crud.interface';
class UsuarioService  implements CRUD
{
    async create(resource: CreateUsuarioDto) {
        return UsuariosDao.addUsuario(resource);
    }
    async updateById(id: number, resource: PutUsuarioDto) {
        return UsuariosDao.putUsuarioById(id, resource);
    }
    
    async list(limit: number, page: number) {
        return UsuariosDao.getUsuarios(limit,page);
    }

    async readById(id: number) {
        return UsuariosDao.getUsuarioById(id);
    }

    async getUserByEmail(email: string) {
        return UsuariosDao.getUsuarioByEmail(email);
    }
    async deleteById(id: number) {
        return UsuariosDao.removeUsuarioById(id);
    }
}
export default new UsuarioService();