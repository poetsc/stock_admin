'use strict'

const _ = require('lodash');

const default_conf = {
    db: {
        "host": "",
        "port": "",
        "user": "",
        "password": "",
        "database": "",
        "dialect": "mysql",
        "timezone": "+08:00",
        "pool": {
            "max": 30,
            "min": 5,
            "idle": 5000,
            "acquire": 10000
        },
        "dateStrings": true
    }
};

class Config {
    constructor() {
        this.env = process.env.NODE_ENV;

        this._conf = _.defaultsDeep({}, {
            local: require('./local'),
            production: require('./production'),
        }[this.env || 'local'], default_conf);

        console.info(`环境：%s`, this.env);
    }

    isLocal() {
        return this.env === 'local';
    }

    isProd() {
        return this.env === 'production';
    }

    get(key) {
        if (key === 'env') {
            return this.env;
        }
        if (['isLocal', 'isProd'].includes(key)) {
            return this[key]();
        } else {
            return this._conf[key];
        }
    }
}

const conf = new Config();

module.exports = conf;