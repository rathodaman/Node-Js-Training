var Handlebars = require('handlebars');
var helpers = require('handlebars-helpers')({
    handlebars: Handlebars
});
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

module.exports = {
    defaultLayout: 'default',
    extname: '.hbs',
    handlebars:allowInsecurePrototypeAccess(Handlebars),
    // Specify helpers which are only registered on this instance.
    helpers: Object.assign(helpers, {
        /**
         * helper function for debug view variables into server log
         * @param  {string}
         * @return {null|void}
         */
        debug: function (data) {
            console.log(data);
        },
        flashMe: function (data) {
            console.log(data);
        },
    })
};
