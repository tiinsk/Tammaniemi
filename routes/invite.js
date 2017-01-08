const passport = require('./passport.js');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authToken = require('../utility/authToken.js');

module.exports = (app, nodemailerTransport) => {
  app.post('/api/invite', passport.authenticate('jwt', {
    session: false
  }), (req, res, next) => {
    const email = req.body.email;

    authToken.generateJWTInviteToken(email)
      .then((jwtToken) => {
        const mailOptions = {
          from: '"Tammaniemi" <no-reply@tammaniemi.fi>', // sender address
          to: email, // list of receivers
          subject: 'Invite to Tammaniemi.fi', // Subject line
          markdown: `
# Hello recipient!

Please use this [link](http://localhost:3000/invite/${jwtToken}) to create account to Tammaniemi.fi.

If the link does not work please copy http://localhost:3000/invite/${jwtToken} to browser.
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
      })
      .then(null, next);
  });
};
