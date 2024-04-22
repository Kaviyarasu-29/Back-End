
const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require("./config")

// const dotenv = require("dotenv");
// dotenv.config();
// require('dotenv').config();
const TodoTask = require("./models/TodoTask");

 
const app = express()
const port = 8081


// Require and configure dotenv
const dotenv = require('dotenv');
dotenv.config();

// Log environment variables to console
console.log(process.env);


const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB:", err));

app.use(express.json())
// app.use(express.urlencoded({ extended: false })) 
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));

app.set("view engine", 'ejs')

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/signUp', (req, res) => {
    res.render('signUp')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/', (req, res) => {
    console.log(req.body);
});



app.post("/signUp", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
  
    //check the user details
    const exitingiuser = await collection.findOne({ name: data.name });
    if (exitingiuser) {
        res.send("user Already exit , pls use diff name")
    }

    else {
        //pass bcrypt
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(data.password, saltRounds)
        data.password = hashedPass
        const userdata = await collection.insertMany(data)
        console.log(userdata)
    }


    // const userdata = await collection.insertMany(data)
    // console.log(userdata)
})

//login user
app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username })
        if (!check) {
            res.send("user con't find")
        }

        //hash pass from the db with the plain test
        const isPassMatch = await bcrypt.compare(req.body.password, check.password)
        if (isPassMatch) {
            res.render('home')
        }
        else {
            req.send("wrong pass")
        }
    }
    catch {
        res.send("wrong details")
    }
})
// res.render('login')


// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { TodoTask: tasks });
    });
});

//POST METHOD
app.post('/', async (req, res) => {
    const TodoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await TodoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});


// GET METHOD
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { TodoTask: tasks });
    });
});


// //POST METHOD - Ensure user is authenticated before adding todo task
// // app.post('/', async (req, res, next) => {
// //     // Check if user is authenticated (you may need to implement this middleware)
// //     if (!req.isAuthenticated()) {
// //         return res.redirect('/login'); // Redirect unauthenticated users to login page
// //     }

// //     const todoTask = new TodoTask({
// //         content: req.body.content
// //     });
// //     try {
// //         await todoTask.save();
// //         res.redirect("/");
// //     } catch (err) {
// //         next(err); // Pass error to the error handling middleware
// //     }
// // });
// app.post('/', async (req, res, next) => {
//     const todoTask = new TodoTask({
//         content: req.body.content
//     });
//     try {
//         await todoTask.save();
//         res.redirect("/");
//     } catch (err) {
//         console.error("Error saving todo task:", err);
//         next(err);
//     }
// });







app.listen(port, () => {
    console.log(`sever running on port : ${port}`)
})




