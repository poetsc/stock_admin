const fs = require('fs');
const Sequelize = require('sequelize');
const  conf = require('../config/');
const db_conf = conf.get('db');

const sequelize = new Sequelize(
    db_conf.database, db_conf.user, db_conf.password, {
        host: db_conf.host,
        port: db_conf.port,
        dialect: "mysql",
        pool: {
            max: db_conf.pool.max,
            min: db_conf.pool.min,
            idle: db_conf.pool.idle,
            acquire: db_conf.pool.acquire
        },
        define: {
            timestamps: false
        },
        logging: console.log,
        timezone: '+08:00'
    }
);

const model_files = fs.readdirSync(__dirname);

const js_files = model_files.filter((f) => {
    return f.endsWith('.js') && f !== 'index.js';
}, model_files);

let models = {
    db: sequelize
};

for (let f of js_files) {
    console.info(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    models[name] = require(`${__dirname}/${f}`)(sequelize, Sequelize.DataTypes);
}

models.stock_finance.belongsTo(models.stock_info, {
    targetKey: 'stock_id',
    foreignKey: 'stock_id',
});

models.stock_finance.belongsTo(models.stock_finance, {
    // sourceKey: 'stock_id',
    targetKey: 'stock_id',
    foreignKey: 'stock_id',
    as: 's2'
});


exports = module.exports = models;