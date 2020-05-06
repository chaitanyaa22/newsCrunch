const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController')
const categoryController = require('../controllers/categoryController')
const bookmarkController = require('../controllers/bookmarkController')
const interestController = require('../controllers/interestController')



//<-------------home route------->
router.get('/', categoryController.homepage)

//<-------------login-signup route----------------->
router.get('/signup', userController.getSignup)
router.post('/signup', userController.postSignup)


router.get('/login', userController.getLogin)
router.post('/login', userController.postLogin)

//<-------------search route----------------->
router.get('/search', categoryController.getSearch)

//<-------------categories route----------------->
router.get('/world', categoryController.getWorld)
router.get('/business', categoryController.getBusiness)

router.get('/entertainment', categoryController.getEntertainment)
router.get('/general', categoryController.getGeneral)

router.get('/health', categoryController.getHealth)
router.get('/science', categoryController.getScience)


router.get('/sports', categoryController.getSports)
router.get('/technology', categoryController.getTechnology)


//<--------------------------------------------------------------------Session MW after login-------------------------------------------->
router.use(function (req, res, next) {
    if (req.session.user) {
        next();
    }
    else {
        res.redirect("/")
    }
})

//<-------------profile route----------------->
router.get('/profile', userController.getProfile)


//<-------------profile update route----------------->
router.post('/userupdate', userController.postUserUpdate)


//<-------------bookmark route----------------->
router.get('/bookmark', bookmarkController.getBookmark)
router.post('/bookmark', bookmarkController.postBookmark)

router.delete('/removeBookmark', bookmarkController.removeBookmark)

//<-------------interests route----------------->
router.post('/addinterest', interestController.postInterest)
router.get('/interests', interestController.getInterest)
router.post('/deleteinterests', interestController.postDeleteInterest)

//<-------------History route----------------->
router.post('/deletehistory', userController.postDeleteHistory)
router.post('/interestadd', interestController.postInterestFromHistory)

//<-------------logout route----------------->
router.get('/logout', userController.getlogout)

module.exports = router;