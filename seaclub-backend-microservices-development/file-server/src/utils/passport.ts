import passport from "passport";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser<any, any>(function (user, done) {
  done(null, user);
});

