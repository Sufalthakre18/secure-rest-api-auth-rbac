import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnect from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import taskRoutes from './routes/task.routes.js';

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://task-manager-frontend-pi-dun.vercel.app',
      'https://task-manager-frontend-pi-dun.vercel.app/',
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.get('/', (_, res) => res.send('api running'));
app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
