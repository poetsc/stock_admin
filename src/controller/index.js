'use strict'

const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

function addControllerFn(router, con) {
    for (let url in con) {
        let path;
        if (url.startsWith('GET ')) {
            path = url.substring(4);
            router.get(path, con[url]);
        } else if (url.startsWith('POST ')) {
            path = url.substring(5);
            router.post(path, con[url]);
        } else if (url.startsWith('PUT ')) {
            path = url.substring(4);
            router.put(path, con[url]);
        } else if (url.startsWith('DELETE ')) {
            path = url.substring(7);
            router.del(path, con[url]);
        } else {
            console.info(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    fs.readdirSync(`${dir || __dirname}`).filter((f) => {
        return f.endsWith('.js') && f !== path.basename(__filename);
    }).forEach((f) => {
        console.info(`process controller: ${f}...`);
        let con = require(`${dir || __dirname}/${f}`);
        addControllerFn(router, con);
    });
}

exports = module.exports = (dir) => {
    let router = Router();
    addControllers(router, dir);
    return router.routes();
}