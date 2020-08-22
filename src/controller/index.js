'use strict'

const Router = require('koa-router');
const path = require('path');
const _ = require('lodash');
const router_rule = require('../config/router');

function addControllers(router) {
    router_rule.forEach(value => {
        const [method, reqPath, controller, action] = value;
        const routerMethod = method.toLowerCase();

        if(!['get','post','put','delete'].includes(routerMethod)){
            throw new Error(`controller|addControllers|router method unexpected: ${value}`);
        }
        if(!_.isString(reqPath) || _.isEmpty(reqPath)){
            throw new Error(`controller|addControllers|router path unexpected: ${value}`);
        }
        if(!_.isString(controller) || _.isEmpty(controller)){
            throw new Error(`controller|addControllers|router controller unexpected: ${value}`);
        }
        if(!_.isString(action) || _.isEmpty(action)){
            throw new Error(`controller|addControllers|router action unexpected: ${value}`);
        }

        router[routerMethod](reqPath, require(path.join('../controller/', controller))[action]);
    })
}

exports = module.exports = (dir) => {
    let router = Router();
    addControllers(router);
    return router.routes();
}