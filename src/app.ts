import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(cors());

app.use('/', (req: Request, res: Response) => {
  res.json({
    message: 'my name is anik',
  });
});

export default app;
