import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';
import { sendError } from './utils/apiResponse.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

connectDB();

app.use(
  cors({
    origin: [CLIENT_URL, 'http://localhost:5173'],
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api', apiRoutes);

app.use((_req: Request, res: Response) => {
  sendError({
    res,
    statusCode: 404,
    message: 'Page not found',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
