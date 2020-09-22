const { Client } = require('pg')
const express = require('express');
const app = express();
app.use(express.json());

// Import all services
require('./routes/subjectController')(app);
require('./routes/jobContorller')(app);




app.listen(3000, () => {
    console.log("Listening on 3000")
})