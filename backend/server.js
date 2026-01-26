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
  origin: 'https://task-manager-frontend-pi-dun.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/', (_, res) => res.send('API running'));

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
