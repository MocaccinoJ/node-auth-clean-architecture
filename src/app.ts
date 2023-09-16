import { Server } from "./presentation/server";
import config  from "./config/config";
import { AppRoutes } from "./presentation/routes";

(() => {

    main();

})()


async function main() {
    //todo: await base de datos
    
    //todo: inicio de nuestro server
    // new Server( { port: 4000 } ).start();
    new Server({ 
        port: Number(config.PORT),
        routes: AppRoutes.routes,
    }).start();
    
}