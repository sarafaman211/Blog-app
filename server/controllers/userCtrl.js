const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const sendEmail = require("../utils/sendEmail")

const userCtrl = {
    // Register and activate are for valid accounts
    register: async(req,res) => { 

        try {

            const { email, password, name } = req.body

            if(!name || !password || !email){
                return res.status(400).json({
                    success: false,
                    message: "fill the credentials"
                })
            }

            if(!validateEmail(email)){
                return res.status(400).json({
                    success: false,
                    message: "fill the correct email !!!"
                })
            }

            const user = await User.findOne({ email })
            if(user){
                return res.status(400).json({
                    success: false,
                    message: "This user already exists"
                })
            }

            if(password.length < 4){
                return res.status(400).json({
                    success: false,
                    msg: "Password must be at least 4 characters !!!"
                })
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: hashPassword
            }

            const authToken = token(newUser)

            const url = `${ process.env.CLIENT_URL }/user/activate/${ authToken } `

            sendEmail(email, url,"Verify your email address" )

            res.status(200).json({
                success: true,
                authToken, newUser,
                msg: "Register Success! Please activate your email to start"
            })
            
        } catch (err) {
            res.status(500).json({ err: err.message })
        }
        
    },

    activate: async (req,res) =>{
        try {
            const { authToken } = req.body
            console.log(authToken)

            const user = jwt.verify(authToken, process.env.TOKEN_KEY)

            const { name, email, password } = user

            const check = await User.findOne({ email })
            if (check) {
                return res.status(400).json({ msg: "This email already exists." })
            }

            const newUser = new User({
                name, email, password
            })

            await newUser.save()

            res.status(200).json({ success: true, msg: "Account has been activated!" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // you can create number of accounts in this
    directRegister: async(req,res) =>{
        try {

            const { name, email, password } = req.body

            // if (!name || !email || !password) {
            //     return res.status(400).json({
            //         success: false,
            //         msg: "fill the following fields"
            //     })
            // }

            // if (!validateEmail(email)) {
            //     return res.status(400).json({
            //         success: false,
            //         msg: "fill the correct email address please !!!"
            //     })
            // }

            // if (password.length < 4) {
            //     return res.status(400).json({
            //         success: false,
            //         msg: "Password must be at least 4 characters !!!"
            //     })
            // }

            let success = false
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, error: "This email is already exists" })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)


            user = await User.create({
                name, email, password: hashPassword
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, process.env.TOKEN_KEY)

            success = true

            res.json({ success, user, authToken })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    
    },

    auth: async (req, res) => {
        try {

            let success = false
    
            const { email, password } = req.body
    
            let user = await User.findOne({ email })
            if(!user){
                return res.status(400).json({ success, error: 'No user found' })
            }
    
            const comparePW = await bcrypt.compare(password, user.password)
            if(!comparePW){
                return res.status(400).json({ success, error: "password dosen't match" })
            }
    
            const data = {
                user: {
                    id: user.id
                }
            }
    
            const authToken = jwt.sign(data, process.env.TOKEN_KEY)
            // const authToken = token(data)
    
            success = true
    
            res.json({ success, authToken })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req,res) =>{
        try {            
            const userId = req.user.id
            const user = await User.findById( userId ).select("-password")
    
            if(!user){
                return res.status(400).json({ success: false })
            }
    
            res.json({ user, success: true })
            
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const {email, password} = req.body
            const hashPassword = await bcrypt.hash(password, 12)
           const updateUser = await User.findByIdAndUpdate({_id: req.user.id}, {
             email, password: hashPassword
            })

            res.json({msg: "Update Success!", updateUser})
        } catch (err) {
             res.status(500).json({msg: err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted Success!"})
        } catch (err) {
             res.status(500).json({msg: err.message})
        }
    },
    userInfo: async (req, res) => {
        try {
                const users = await User.find().select('-password')
                res.json(users)
        } catch (err) {
             res.status(500).json({msg: err.message})
        }
    },
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function token(payload){
    return jwt.sign(payload, process.env.TOKEN_KEY)
}

module.exports = userCtrl