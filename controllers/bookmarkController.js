const mongoose = require("mongoose")
const UserModel = require('../models/user.model')

//<----------------------------------get bookmark route--------------------------->

module.exports.getBookmark = function (req, res) {
    UserModel.findById({ _id: mongoose.Types.ObjectId(req.session.user.id) }).exec()
        .then(function (user) {
            if (user) {
                res.render("bookmark", {
                    user: user,
                    userCity: user.city,
                    userId: user.id,
                    bookmark: user.bookmark
                })
            }
        })
}


//<----------------------------------post bookmark route--------------------------->

module.exports.postBookmark = function (req, res) {
    var id = mongoose.Types.ObjectId(req.body.id)
    UserModel.findById({ _id: id }).exec()
        .then(function (user) {
           const bookmarkVal = user.bookmark.find((bookmark)=> bookmark.title == req.body.title)
           if(bookmarkVal){
               res.status(409).send("Error")
            }
            else {
                var bookmark = {
                    index: req.body.index,
                    name: req.body.name,
                    img: req.body.img,
                    author: req.body.author,
                    title: req.body.title,
                    description: req.body.description,
                    url: req.body.url,
                    publishedAt: req.body.publishedAt,
                    content: req.body.content,
                    id: req.body.id
                }
                var bookmarkArr = []

                UserModel.findById({ _id: id }).exec()
                    .then(function (user) {

                        if (user.bookmark) {
                            bookmarkArr = user.bookmark
                            bookmarkArr.unshift(bookmark)

                        }
                        else {
                            bookmarkArr.push(bookmark)
                        }
                        //  console.log('userType', bookmarkArr)
                        UserModel.updateOne({ _id: id }, { $set: { "bookmark": bookmarkArr } }).exec()
                            .then(function (user) {})
                            .catch(function (err) {
                                console.log("error in update boomark", err)
                            })
                    })

                res.status(200).send("ok");
            }
        })
    }

            //<----------------------------------remove bookmark route--------------------------->

            module.exports.removeBookmark = function (req, res) {
                var id = mongoose.Types.ObjectId(req.body.id)
                var removeBookmark = {
                    index: req.body.index,
                    title: req.body.title,
                    id: req.body.id
                }
                UserModel.findById({ _id: id }).exec()
                    .then(function (user) {
                        if (user.bookmark) {
                            let bookmarkArr = user.bookmark
                            updatedBookmarks = bookmarkArr.filter(bookmark => !(bookmark.title == removeBookmark.title))
                            UserModel.updateOne({ _id: id }, { $set: { "bookmark": updatedBookmarks } }).exec()
                                .then(function (user) {
                                    res.status(200).send('OK')
                                })
                                .catch(function (err) {
                                    res.status(204).send('Error')
                                    console.log("error in update boomark", err)
                                })

                        }

                    })
            }