// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')
// Require cors, and body-parse
const bodyParser = require('body-parser')
const cors = require('cors')
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3333;

app.listen( port, () => {
    console.log(`Server is running and listening to port: ${port}`)
})

//Get Route
app.get('/all', (req, res) => {
    console.log(projectData)
    res.send(projectData)
})


//POST Route
app.post('/', (req, res) => {
    projectData = {
        temperature: req.body.temp,
        date: req.body.date,
        userResponse: req.body.feelings
    }
})


