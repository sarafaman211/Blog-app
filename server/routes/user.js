const express = require("express")
const userCtrl = require("../controllers/userCtrl")
const auth = require("../middleware/auth")
const isAdmin = require("../middleware/isAdmin")
const router = express.Router()

// Post Request
router.post("/register", userCtrl.register)
router.post("/directRegister", userCtrl.directRegister)
router.post("/activate", userCtrl.activate)
router.post("/auth", userCtrl.auth)

// Get Request
router.get("/login",auth, userCtrl.login)
router.get("/userinfo",auth,isAdmin,userCtrl.userInfo)

// Put Request
router.put("/updateUser", auth, userCtrl.updateUser )

// Delete Request
router.delete("/deleteUser/:id", auth, userCtrl.deleteUser )

module.exports = router