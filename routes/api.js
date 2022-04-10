const moment = require("moment")
const showdown = require("showdown")

const BlogPostModel = require("../models/post.js")

module.exports = {
    // for the get all blog posts API
    getAllBlogPosts: function(callback) {
        const now = moment().unix()

        BlogPostModel.find({dateTimestamp: {$lte: now}}, "title urlTitle dateTimestamp tags thumbnailImageUrl")
        .sort({dateTimestamp: -1})
        .exec(function(error, posts) {
            if (error) {
                callback({getDataError: true})
            } else {
                callback({success: true, posts: posts})
            }
        })
    }, 

    // for the get blog posts by tag API
    getBlogPostsByTag: function(tag, callback) {
        const now = moment().unix()

        BlogPostModel.find({tags: tag, dateTimestamp: {$lte: now}}, "title urlTitle dataTimestamp tags thumbnailImageUrl")
        .sort({dateTimestamp: -1})
        .exec(function(error, posts) {
            if (error) {
                callback({getDataError: true})
            } else {
                callback({success: true, posts: posts})
            }
        })
    },

    // for the get 5 newest posts API
    getFiveNewestPosts: function(callback) {
        const now = moment().unix()

        BlogPostModel.find({dateTimestamp: {$lte: now}}, "title urlTitle dateTimestamp tags thumbnailImageUrl")
        .sort({dateTimestamp: -1})
        .limit(5)
        .exec(function(error, posts) {
            if (error) {
                callback({getDataError: true})
            } else {
                callback({success: true, posts: posts})
            }
        })
    },

    // for the get post based on title
    getBlogPostByUrlTitle: function(urlTitle, callback) {
        BlogPostModel.findOne({urlTitle: urlTitle}).exec(function(error, post) {
            if (error) {
                callback({getDataError: true})
            } else if (!post) {
                callback({notFoundError: true})
            } else {
                const markdownConverter = new showdown.Converter()
                post.markdownContent = markdownConverter.makeHtml(post.markdownContent)

                callback({success: true, post: post})
            }
        })
    }
}