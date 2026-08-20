// packages
import express from 'express';
import logger from 'morgan';
import helmet from "helmet";
import session from 'express-session';
import cors from 'cors';

// files
import { sessionOptions } from "./middleware/sessionOptions.js";
import { router } from "./index.router.js";
import {errorHandler} from './middleware/errorHandler.js'

// code
export const app = express();

app.use(cors( {origin: 'http://localhost:5173', credentials: true}));
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
app.use(errorHandler);
