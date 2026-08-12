import {Db, MongoClient, ServerApiVersion} from "mongodb";

const uri: string = process.env.dev_DB_URL || "";
if (!uri) {
    throw new Error(`DB_URL is not defined in .env`);
}


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function ping(): Promise<void> {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}


let connection: Db | null = null;
async function initConnection(): Promise<Db> {
    if(!connection){
        await client.connect()
        connection = client.db("admin");
    }
    return connection;
}



async function closeConnection() {
    if(connection){
        await client.close()
        connection = null;
        console.log("Closed connection to DB")
    }
}

export const db = {
    getConnection: initConnection(),
    closeConnection: closeConnection(),
    ping: ping()
}
// export default db;