require('./config/config.js');

const port = process.env.PORT || 3000;

const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const {mongoose} = require('./db/mongoose');

// Routes
const userRoutes  = require('./routes/users');
const genreRoutes = require('./routes/genres');
const movieRoutes = require('./routes/movies');

const app = express();

// Express init
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);

app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

app.listen(port, () => console.log(`Server started at port ${port}`));
