import express from 'express';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import terroristsRouter from './routes/terroristsRouter.js';
import organizationsRouter from './routes/organizationsRouter.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/terrorists', terroristsRouter);
app.use('/organizations', organizationsRouter);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));