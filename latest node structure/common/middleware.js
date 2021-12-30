//class for common function
module.exports = {
    flashMiddelware: async function (req, res, next) {
        let error = req.flash('error');
        let success = req.flash('success');
        if (success.length > 0) {
            res.locals.flash = {
                type: 'success',
                message: success
            };
        }
        if (error.length > 0) {
            res.locals.flash = {
                type: 'error',
                message: error
            };
        }
        return next();
    },
    commonMiddelware: async function (req, res, next) {
        return next();
    }
};