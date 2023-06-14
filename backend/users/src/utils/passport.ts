import passport from "passport";
import { findOrganizationById, findOrganizationsByVanityName } from "../services/linkedIn";
import { linkedIn, socialAuth } from "../constants";
import { Profile } from "../@types/user";
import { findByEmailOrCreateUser } from "../services/user";

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


const StrategyCallback = async (profile: Profile, done: any) => {
    try {
      await findByEmailOrCreateUser(profile);
      return done(null, profile);
    } catch (error) {
      return done(null, error);
    }
}

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function (accessToken: any, refreshToken: any, profile: Profile, done: any) {
    await StrategyCallback(profile, done)
  }
));

// // this strategy will run on login by linkedin request
passport.use('oauthStrategy', new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_OAUTH_CALLBACK_URL,
  scope: socialAuth.oauthLinkedinScope,
  state: true
},
  async function (accessToken: any, refreshToken: any, profile: Profile, done: any) {
    await StrategyCallback(profile, done)
  }
));

// this strategy will run on get organization info request
passport.use('organizationStrategy', new LinkedInStrategy({
  clientID: process.env.LINKEDIN_KEY,
  clientSecret: process.env.LINKEDIN_SECRET,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL,
  scope: socialAuth.organizationLinkedinScope,
  state: true
},
  async function (accessToken: any, refreshToken: any, profile: Profile, done: any) {
    let organizationDetails = null;
    try {
      if (linkedIn.organizationId)
        organizationDetails = await findOrganizationById(linkedIn.organizationId, accessToken);
      if (linkedIn.vanityName)
        organizationDetails = await findOrganizationsByVanityName(linkedIn.vanityName, accessToken);
    } catch (err) {
      done(null, err);
    }
    done(null, organizationDetails);
  }
));

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  profileFields: ["email"]
},
  async function (accessToken: any, refreshToken: any, profile: Profile, done: any) {
    await StrategyCallback(profile, done)
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser<any, any>(function (user, done) {
  done(null, user);
});

