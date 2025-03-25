const express = require('express');
const morgan = require('morgan');
const cors = require("cors");

const userRoutes = require("./scripts/routes/userRoutes");
const routeRoutes = require("./scripts/routes/routeRoutes");
const contentRoutes = require("./scripts/routes/contentRoutes");
const imageRoutes = require("./scripts/routes/imageRoutes");

const app = express();
const hostname = 'nodejs_2425-cs7025-group4';
const port = 3000;
const project_name = 'foxtrot';

process.umask(0o002);

// Use Morgan for logging HTTP requests
app.use(morgan('dev'));

app.use(express.json());

// Use CORS
app.use(cors()); 

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set routers
app.use('/users', userRoutes); 
app.use('/routes', routeRoutes);
app.use('/content', contentRoutes);
app.use('/images', imageRoutes);

//Set static folder for serving images
app.use('/uploads', express.static('uploads'));


// Define the root route that renders our index page
app.get('/', (req, res) => {
  res.render('index', { project_name});
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

