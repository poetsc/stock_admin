'use strict'

const Koa = require('koa');
const helmet = require("koa-helmet");
const bodyParser = require('koa-bodyparser');

const Controller = require('./controller');


const app = new Koa();

app.use(helmet());

app.use(bodyParser());

app.use(Controller());

const server = app.listen(8080, () => {
    const { address, port } = server.address();
    console.info(`Koa server listening on http://%s:%s`, address, port);
});

app.on('error', err => {
    console.error('server error: ', err);
});