'use strict'

const {
    Op
} = require("sequelize");

const Model = require('../model');


class StockDAO {
    constructor() {}

    async stock_create(stock) {
        return Model.stock_info.create(stock);
    }
}

exports = module.exports = new StockDAO;