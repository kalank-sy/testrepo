const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const collection = require("./config");
const path = require("path");
const port = 80;
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set up middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handler to render the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'login.html'));
// });
app.get('/', (req, res) => {
    res.render('index');
});
app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.pswd
    }
    console.log("data from body:", data);
    try {
        // Check if the user already exists in the database
        const existUser = await collection.findOne({ email: data.email });

        if (existUser) {
            return res.status(409).send("User already exists. Please choose a different username.");
        }

        else {
            // Hash the password using bcrypt
            const saltRounds = 10; // Number of salt rounds for bcrypt
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
            console.log("data to the database:", data);
            
            // Create a new user instance and save it to the database
            const newUser = new collection(data);
            await newUser.save();
            return res.status(200).sendFile(path.join(__dirname, 'public', 'html','homepage', 'homepage.html'));
        }
    } catch (error) {
        console.error("Error while signing up user:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Login user
app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ email: req.body.email });
        if (!user) {
            return res.send("User not found");
        }

        // Compare the hashed password from the database with the plain text password
        const isPasswordMatch = await bcrypt.compare(req.body.pswd, user.password);
        if (isPasswordMatch) {
            return res.status(200).sendFile(path.join(__dirname, 'public', 'html','homepage', 'homepage.html'));
        } else {
            return res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(port, () => {
    console.log("App is running at port 80 http://127.0.0.1");
});
