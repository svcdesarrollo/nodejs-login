"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UsersControllers {
    constructor() {
        this.users = [];
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    Register(req, res) {
        try {
            if (!req.body) {
                res.status(400).send("Debes indicar nombre, email, password");
            }
            console.log(req.body);
            const { name, email, password } = req.body;
            if (!(email && name && password)) {
                res.status(400).send("Debes indicar nombre, email, password");
            }
            console.log(this.users);
            //console.log(this.data);
            /*
            const userExists = this.users.find(user => user.email === email);
            if(userExists){
                res.status(400).send("El usuario existe, por favor inicia sesión con tus credenciales");
            }
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser:User={
                name:name,
                email:email,
                password:encryptedPassword
            }
           // this.users = [...this.users, newUser];*/
        }
        catch (error) {
            console.log(error);
        }
        // res.json(this.newUser);
    }
    List(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send('USER LIST');
        });
    }
}
const usersControllers = new UsersControllers();
exports.default = usersControllers;
