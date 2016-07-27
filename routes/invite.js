const passport = require('./passport.js');
const authToken = require('../utility/authToken.js');

module.exports = (app, nodemailerTransport) => {
  app.post('/api/invite', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    const email = req.body.email;

    authToken.createToken().then(({
      token
    }) => {
      const mailOptions = {
        from: '"Tammaniemi" <no-reply@tammaniemi.fi>', // sender address
        to: email, // list of receivers
        subject: 'Invite to Tammaniemi.fi', // Subject line
        markdown: `
# Hello recipient!

Please use this [link](http://localhost:3000/invite/${token}) to create account to Tammaniemi.fi.

If the link does not work please copy http://localhost:3000/invite/${token} to browser.
`
      };

      // send mail with defined transport object
      nodemailerTransport.sendMail(mailOptions, (error, info) => {
        if (error) {
          next(error);
        }
        console.log(info.response.toString());

        res.sendStatus(200);
      });
    });
  });
};
