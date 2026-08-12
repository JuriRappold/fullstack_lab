// packages
import express from 'express';
import logger from 'morgan';
import helmet from "helmet";
import session from 'express-session';

// files
import { sessionOptions } from "./middleware/sessionOptions.js";
import { router } from "./index.router.js";

// code
export const app = express();

app.use(express.json());

app.use(helmet())
app.disable('x-powered-by')


//Sessions
app.use(session(sessionOptions))

//Morgan logger:
app.use(logger('dev', {immediate: true}))


// Router
app.use('', router)

// Error Handling
