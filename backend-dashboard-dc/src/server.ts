import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Dashboard DC API is running');
});

app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✅ Server is running at http://0.0.0.0:${PORT}`);
    console.log(`   Local  : http://localhost:${PORT}`);
    console.log(`   Network: http://<IP-LAN-Anda>:${PORT}`);
});
