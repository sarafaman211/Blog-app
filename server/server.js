const express = require("express")
const db = require("./db")
const colors = require("colors")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const dotEnv = require("dotenv")
const bodyParser = require("body-parser")

// .env file config
dotEnv.config({ path: "./.env" })

const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.json())

// functions
db()

// routes
app.use("/api/user", require("./routes/user"))
app.use("/api/post", require("./routes/post"))


app.listen(port, () => {
    console.log(`Server connection established in ${ port } is in ${ process.env.NODE_ENV }`.america)
})