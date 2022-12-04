async function start () {
    return await Promise.resolve("function works");
}

start().then(console.log);

class Util {
    static ID = new Date();
}

console.log("util.ID : " + Util.ID);