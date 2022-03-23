import express, { application, Request, Response } from 'express';
import { connect } from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { AppRoutes } from './modules/routes';
import 'dotenv/config';

class App {
  private app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.middleware();
    this.config();
    this.connectDB();
    this.registerRoutes();
  }
  //this function will return express app
  express(): express.Application {
    return this.app;
  }
  //Configuration  for all middlewares
  private middleware(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  //Configuration
  private config(): void {
    this.app.disable('x-powered-by');
  }

  //DB connection
  private async connectDB(): Promise<void> {
    const MONGO_PATH = process.env.MONGO_PATH || '';

    await connect(MONGO_PATH).then(() => console.log('DB connected'));
  }

  //register all the routes
  private async registerRoutes(): Promise<void> {
    this.app.use('/api/v1', AppRoutes);

    //this will return 404 route
    this.app.use((req: Request, res: Response) => {
      return res.status(404).send('not found');
    });
  }

  //this function listen to server at given port number
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('app listening on port 3000');
    });
  }
}

export default App;
