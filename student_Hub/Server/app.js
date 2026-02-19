const express = require('express');
const cors = require('cors')
const { configDotenv } = require('dotenv');
const connectdb = require('./dbConnection/db');
const stdRouter = require('./routes/stdRouter');
const stdSubRouter = require('./routes/stdSubRouter');

const app = express();

configDotenv();
connectdb();

//  JSON parser MUST come before routes
app.use(cors())
app.use(express.json());

// server testing api
app.get('/', (req, res) => {
    return res.json({ message: 'Studen_Hub server at works' });
});

// std Router (mount ONCE)
app.use('/api/std', stdRouter);

app.use('/api/std/subject',stdSubRouter);


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
