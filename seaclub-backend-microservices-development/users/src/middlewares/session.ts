import cookieSession from "cookie-session";

const session = () => {
    return cookieSession({
        secret: process.env.SESSION_SECRET,
        name: "session",
        signed: false,
        secure: process.env.NODE_ENV !== 'test', // true in production
        sameSite: "lax",
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 100 * 365,
    });
};

export default session;
