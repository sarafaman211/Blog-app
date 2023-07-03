const mongoose = require("mongoose")
const { Schema } = mongoose

const postSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        title:{
            type: String
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Post", postSchema)