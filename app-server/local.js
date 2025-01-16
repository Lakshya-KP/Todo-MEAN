const {init} = require("./dist/server/app-server.js");

async function main() {
    await init();
}

main();


/**
 * setup the mongodb connection
 * how to use that in that here in app-server.....
 */
