const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors')
app.use(cors());
app.use(express.json());
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId
const port = process.env.PORT || 4000;
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.elbg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const client = new MongoClient(url);

async function server() {
    try {
        await client.connect();
        //console.log('connected');
        const database = client.db('Portfolio');
        const projects = database.collection('projects');
        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const result = await projects.findOne(query);
            res.json(result);
        })
        app.get('/projects', async (req, res) => {
            const cursor = projects.find({})
            const result = await cursor.toArray();
            res.json(result)
        })
    }
    finally {

    }

}
server().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})