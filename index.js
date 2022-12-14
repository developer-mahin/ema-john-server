const express = require('express');
const cors = require("cors")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000


// middleware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nvoyk90.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const productsCollection = client.db("ema-john").collection("products")

async function run() {

    try {


    } catch (error) {

        console.log(error.name, error.message)

    }

}

run().catch(error => {
    console.log(error.name, error.message)
})


app.get("/products", async (req, res) => {

    try {
        const page = parseInt(req.query.page)
        const size = parseInt(req.query.size)

        const query = {}
        const cursor = productsCollection.find(query)
        const products = await cursor.skip(page * size).limit(size).toArray()
        const count = await productsCollection.estimatedDocumentCount()
        res.send({ count, products })

    } catch (error) {
        res.send({
            success: false,
            error: error.message
        })
    }
})


app.post("/productsById", async (req, res) => {
    const ids = req.body
    const objectId = ids.map(id => ObjectId(id))
    const query = { _id: { $in: objectId } }
    const cursor = productsCollection.find(query)
    const products = await cursor.toArray()
    res.send(products)
})



app.get("/", (req, res) => {
    res.send("Ema john server is running")
})

app.listen(port, () => {
    console.log(`Ema john server is running on ${port}`)
})
