require('./config/config.js');
const imgConfig = require('./config/multer.json');

const port = process.env.PORT || 3000;

const express    = require('express');
const bodyParser = require('body-parser');
const multer     = require('multer');
const {mongoose} = require('./db/mongoose');

// Routes
const userRoutes  = require('./routes/users');
const genreRoutes = require('./routes/genres');
const movieRoutes = require('./routes/movies');

const app = express();

// Multer init
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File should be *.jpeg or *.png'), false);
  }
}
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'public/img/original');
   },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

// Express init
app.use(multer({ storage, limits:{ fileSize: imgConfig.multerFileSize }, fileFilter }).single('image'));
app.use('/uploads', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/genres', genreRoutes);
app.use('/movies', movieRoutes);

// Express error handler
app.use((error, req, res, next) => {
  res.json({ message: error.message });
});

app.listen(port, () => console.log(`Server started at port ${port}`));
