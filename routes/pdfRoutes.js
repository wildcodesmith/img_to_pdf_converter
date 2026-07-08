import express from 'express' 
import multer from 'multer'
import pdfHandler from "../controllers/pdfController.js"

const router = express.Router()


// multer middleware 
//multer will temporarily store the files in the folder 'uploads'
const upload = multer({ dest: 'uploads/' })

router.get('/', (req, res) => {
  res.render('form', { foo: 'FOO' });
});

//handliing post request form endpoint 'convert'
router.post("/convert", upload.array('images'),pdfHandler)

export default router;