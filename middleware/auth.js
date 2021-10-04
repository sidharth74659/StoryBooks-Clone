module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        // if you are already logged-in and went to the '/' route(i.e login page), you don't want to see login page..so we'll redirect them to '/dashboard'

        //TLDR; redirect from '/' to '/dashboard' if the user is already logged-in
        if (req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}