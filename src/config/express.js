import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import index from '../server/routes/index.route';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

/* GET home page. */
app.get('/', (req, res) => {
  res.send(`server started on  port http://127.0.0.1:${config.port} (${config.env})`);
});

app.use('/api', index);

export default app;
