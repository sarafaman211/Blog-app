const Post = require("../models/Post")
const User = require("../models/User")


const postCtrl = {
    allBlogs: async (req, res) => {
        let blogs;
        try {
            blogs = await Post.find().populate("user");
        } catch (err) {
            return console.log(err);
        }
        if (!blogs) {
            return res.status(404).json({ message: "No Blogs Found" });
        }
        return res.status(200).json({ blogs });
    },

    addBlog: async (req, res) => {
        try {
            const { title, description } = req.body

            const blog = new Post({
                title, description, user: req.user._id
            })

            const newBlog = await blog.save()
            console.log(newBlog)

            res.status(200).json({ success: true, newBlog })

        } catch (err) {
            res.status(500).json({ error: err.message })
        }


    },

    like: async (req, res) => {
        try {

            const post = await Post.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ error: "Post already Liked" })
            }

            post.likes.unshift({ user: req.user.id })

            await post.save()

            res.status(200).json(post.likes)

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    unLike: async (req, res) => {
        try {

            const post = await Post.findById(req.params.id)

            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ error: "Post has not been yet liked" })
            }

            const removeIndex = post.likes.map(unlike => unlike.user.toString).indexOf(req.user.id)

            post.likes.splice(removeIndex, 1)

            await post.save()

            res.status(200).json(post.likes)

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    comment: async (req, res) => {

        try {

            const { description } = req.body

            const user = req.user.id

            const post = await Post.findById(req.params.id)

            const newComment = {
                description, user
            }

            post.comments.unshift(newComment)

            await post.save()

            res.status(200).json(post.comments)

        } catch (err) {
            res.status(500).json({ error: err.message })
        }

    },

    deleteComment: async (req, res) => {
        try {

            const post = await Post.findById(req.params.id)

            const comment = post.comments.find(comment =>
                //  console.log(comment.id === req.params.comment_id) 
                comment.id === req.params.comment_id)

            if (!comment) {
                return res.status(400).json({ error: "No Comment found" })
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ error: "User not Authorized" })
            }

            const removeIndex = post.comments.map(comments => comments.user.toString).indexOf(req.user.id)

            post.comments.splice(removeIndex, 1)

            await post.save()

            res.status(200).json(post.comments)

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    updateBlog: async (req, res) => {
        const { title, description } = req.body;
        let blog;
        try {
            blog = await Post.findByIdAndUpdate(req.params.id, {
                title,
                description,
            });
        } catch (err) {
            return console.log(err);
        }
        if (!blog) {
            return res.status(500).json({ message: "Unable To Update The Blog" });
        }
        return res.status(200).json({ blog });
    },

    deleteBlog: async (req, res) => {
        try {
            try {
                await Post.findByIdAndDelete(req.params.id)

                res.json({ msg: "blog Data Deleted Success!" })
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    },

    blogs: async (req, res) => {
        try {

            const blog = await Post.findById(req.params.id)

            res.json({ blog })

        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

module.exports = postCtrl