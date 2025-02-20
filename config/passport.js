const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const { SECRET_KEY } = process.env;

const User = require("./models/user.js");

passport.use(
    new jwtStrategy(
        {
            jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: SECRET_KEY
        },
        async (jwt_payload, done) => {
            console.log(jwt_payload)
            User.findOne({email: jwt_payload.doc.email})
                .then((user) => {
                    if(user){
                        return done(null, user);
                    } else if (err){
                        return done(err, false);
                    } else {
                        return done(null, false);
                    }
                })
                .catch((err) => {
                    return done(err, false);
                });
        }
    )
);

module.exports = passport;