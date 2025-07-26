/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../module/user/user.model";
import { Role } from "../module/user/user.interface";

passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "no email found" });
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerID: profile.id,
              },
            ],
          });
        }
        return done(null, user);
      } catch (error) {
        console.log("goooogleStrategy error", error);
        return done(error);
      }
    }
  )
);
passport.serializeUser(function (
  user: any,
  done: (err: any, id?: unknown) => void
) {
  done(null, user.id);
});
passport.deserializeUser(async function (
  id: unknown,
  done: (err: any, user?: Express.User | false | null) => void
) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
