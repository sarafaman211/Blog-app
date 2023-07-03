const mongoose = require("mongoose")

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URI, console.log(` Database connected `.bgCyan))
}

module.exports = connectDb