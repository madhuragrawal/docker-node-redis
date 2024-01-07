const express = require("express");
const { createClient } = require('redis');
const path = require('path');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public'), {'maxage': '2h'}))

app.get("/get", async (req, res) => {
    const client = await createClient({ url: "redis://redis:6379" })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    const value = await client.get(req.query.name);
    await client.disconnect();
    res.status(200).send({ value });
})

app.get("/set", async (req, res) => {
    const [key, value] = Object.entries(req.query)[0];
    const client = await createClient({ url: "redis://redis:6379" })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
    await client.set(key, value);
    await client.disconnect();
    res.status(200).send({ added: true });
})

app.listen(3001, () => {
    console.log("Server Started")
})