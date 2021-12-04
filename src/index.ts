import express,{Application} from 'express';
import morgan  from 'morgan';
import cors from 'cors';
import authRoutes  from './auth/auth.routes';
import usuarioRoutes from './usuarios/usuarios.routes';
import 'dotenv/config';
import helmet from 'helmet';

class Server
{
    public app:Application;

    constructor(){
        this.app=express();
        this.config();
        this.routes();
    }
    config():void{
        helmet
       
        this.app.set('port',process.env.port||4000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json({limit: '5mb'}));
        this.app.use(express.urlencoded({extended:false}));
        
        this.app.use((req, res, next)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
            res.header('Access-Control-Expose-Headers', 'Content-Length');
            res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
            if (req.method === 'OPTIONS') {
                return res.status(200).send();
            } else {
                return next();
            }
        });
    }
    routes():void{
        this.app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).send(`API REST`)
        });
        
        this.app.use(authRoutes);
        this.app.use(usuarioRoutes);
    }
    start():void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Server on port",this.app.get('port'));
        })
    }
}
const server=new Server();
server.start();