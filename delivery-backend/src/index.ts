import express from 'express';
import cors from 'cors';
import slotsRouter from './routes/slots';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/slots', slotsRouter);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
