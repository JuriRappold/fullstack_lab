// just for testing the utils import
import { testing } from "@fullstack-lab/utils";
import { app } from './app.js'
import * as http from "node:http";

const PORT = process.env.PORT || 3001;


const httpServer = http.createServer(app);
httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
// testing()