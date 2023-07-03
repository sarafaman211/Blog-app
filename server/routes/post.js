const express = require("express")
const postCtrl = require("../controllers/postCtrl")
const auth = require("../middleware/auth")
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: fileFilter })
// Routers
router.get("/allBlogs", postCtrl.allBlogs)
router.get("/blogs/:id",auth, postCtrl.blogs)
router.post("/addBlogs",auth,upload.single("file"), postCtrl.addBlog)
router.put("/updateBlog/:id",auth, postCtrl.updateBlog)
router.delete("/deleteBlog/:id",auth, postCtrl.deleteBlog)

router.put("/like/:id",auth, postCtrl.like)
router.put("/unLike/:id",auth, postCtrl.unLike)
router.post("/comment/:id",auth, postCtrl.comment)
router.delete("/deleteComment/:id/:comment_id",auth, postCtrl.deleteComment)

module.exports = router