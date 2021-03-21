import path from 'path';
import express from 'express';
import multer from 'multer';
import { fileURLToPath} from "url";
const router = express.Router();

// const __dirname = dirname(fileURLToPath(import.meta.url)).split("\\");
// __dirname[__dirname.length - 1] = "uploads";

function destination(req, file, cb) {
    cb(null, 'uploads/');
}

function filename(req, file, cb) {
    cb(null, `/${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
}

const storage = multer.diskStorage({destination, filename})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extension_name = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype); // every file has a mimetype - jpg has image/jpg so we want to check that as well
    // if extname=true which means we had a valid file type and mimetype exists
    if (extension_name && mimetype) {
        return cb(null, true); // null for error
    } else { // we're missing at least 1
        return cb('Images only!'); // pass an error message in
    }
}

// this is what was pass in as middleware to our row
// make sure we pass a fileFilter - function that doesn't let us put in alllll kinds of files, only ones we allow
const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

// pass 'upload' as middleware - works with image state
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
})

// return image when requested for preview
router.get("/image-:id", (req, res) => {
    // console.log(Object.keys(req));
    // console.log(req.params.id);
    // const options = {
    //     root: path.join(path.dirname('/'), "uploads")
    // }
    // console.log(path.join(path.dirname('/'), "uploads"));
    res.sendFile(`/uploads/image-${req.params.id}`)
})

export default router;