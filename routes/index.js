const express =  require("express")

const api = require("./api.js")

const app = express.Router()

// for the get all blog posts API
app.get("/posts/get-all-blog-posts", function(req, res) {
    api.getAllBlogPosts(function(apiResponse) {
        res.json(apiResponse)
    })
})

// for the get blog posts by tag API
app.get("/posts/get-blog-posts-by-tag", function(req, res) {
    api.getBlogPostsByTag(req.query.tag, function(apiResponse) {
        res.json(apiResponse)
    })
})

// for the 5 most recent posts API
app.get("/posts/get-five-newest-posts", function(req, res) {
    api.getFiveNewestPosts(function(apiResponse) {
        res.json(apiResponse)
    })
})

//for the get post based on title API
app.get("/posts/get-blog-post-by-url-title", function(req, res) {
    api.getBlogPostByUrlTitle(req.query.urlTitle, function(apiResponse) {
        res.json(apiResponse)
    })
})

module.exports = app