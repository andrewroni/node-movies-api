const multerConfig = require('../config/multer.json');

const multer = require('multer');
const mkdirp = require('mkdirp');

// Multer init
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('File should be *.jpeg or *.png'), false);
  }
};

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
    cb(null, multerConfig.uploadPathOriginal);
   },
  filename: function (req, file, cb) {
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    cb(null, file.fieldname + '-' + Date.now() + ext);
  }
});

mkdirp.sync(multerConfig.uploadPathOriginal);
mkdirp.sync(multerConfig.uploadPathThumb);

const upload = multer({
  storage,
  limits: {
    fileSize: multerConfig.multerFileSize
  },
  fileFilter
}).single('image');

module.exports = {upload};
