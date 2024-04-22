const mongoose = require("mongoose")
const connet = mongoose.connect("mongodb://localhost:27017/LoginTest")



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://kaviS:5800@cluster0.hbylbhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



// mongoose.set('useFindAndModify', false);

// mongoose.connect('mongodb://localhost:27017/LoginTest').then(()=>{console.log('connected')})

connet.then(() => {
    console.log("connected DB")
}).catch(err => {
    console.log("con't connect db")

})


const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    }
})

const collection = new mongoose.model("User", LoginSchema)
module.exports = collection;

// const mongoose = require("mongoose");
//connection to db
// mongoose.set("useFindAndModify", false);



// mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
//     console.log("Connec	ted to db!");
//     // app.listen(3000, () => console.log("Server Up and running"));
// });


