import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { MongoDatabase } from "./data/mongodb";
import { envs } from "./config";

(() => {

    main();

})()


async function main() {
    //todo: await base de datos

    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    //todo: inicio de nuestro server
    // new Server( { port: 4000 } ).start();
    new Server({ 
        port: Number(envs.NODE_PORT),
        routes: AppRoutes.routes,
    }).start();
    
}