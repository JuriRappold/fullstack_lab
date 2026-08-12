import type { SessionOptions } from "express-session";


const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    console.log(`session secret:\n${SESSION_SECRET}\nend`)
    throw new Error("SESSION_SECRET is not defined");
}
const SESSION_NAME = process.env.SESSION_NAME;

export const sessionOptions: SessionOptions = {
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "lax",
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60,
    },
    rolling: true,
};