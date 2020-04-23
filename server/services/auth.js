const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')




//MIDDLEWARE
exports.checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 50,
        jwksUri: 'https://dev-cnvrv656.eu.auth0.com/.well-known/jwks.json'
    }),
    audience: 'NyPpgYDS3BjIG8fUDpvrrlToISdQUoFR',
    issuer: 'https://dev-cnvrv656.eu.auth0.com/',
    algorithms: ['RS256'],
    handleSigningKeyError: (err, cb) => {
        if (err instanceof jwksRsa.SigningKeyNotFoundError) {
          return cb(new Error('This is bad'));
        }
    
        return cb(err);
      }

})

exports.checkRole = function(role) {
    return function(req, res, next) {
        const user = req.user

        if (user && (user[`${process.env.NAMESPACE}/role`] === role)) {
            next()
        } else {
            return res.status(401).send({title: "not authorized", detail: "you are not authorized to access this data"})
        }
    }
}