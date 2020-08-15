'use strict'

const _ = require('lodash');
const {
    Op
} = require("sequelize");

const Model = require('../model');


class FinanceDAO {
    constructor() { }

    async finance_create(stock) {
        return Model.stock_finance.create(stock);
    }

    async finance_display(query) {
        const {
            offset,
            count
        } = query;

        let condition = {
            '$s2.id$': {
                [Op.eq]: null
            }
        };

        for (const key in query) {
            if (key === 'offset' || key === 'count') {
                continue;
            }
            switch(key){
                case 'stock_name':
                    condition['$stock_info.stock_name$'] = {
                        [Op.like]: `%${query[key]}%`
                    }
                    break;
                default:
                    condition[key] = query[key];
                    break;
            }
        }

        let options = {
            attributes: ['report_year', 'roe', 'net_profit', 'profit_margin', 'net_asset_per', 'core_growth', 'np_growth'],
            include: [
                {
                    attributes: [],
                    model: Model.stock_finance,
                    required: false,
                    as: 's2',
                    where: {
                        'report_year': {
                            [Op.gt]: Model.db.col('stock_finance.report_year')
                        }
                    }
                },
                {
                    model: Model.stock_info,
                    attributes: ['stock_id', 'stock_name', 'rating'],
                    required: false,
                },
            ],
            where: condition,
            offset: parseInt(offset)
        }

        let limit = parseInt(count);
        if (limit !== -1) {
            options.limit = limit;
        }
        
        return Model.stock_finance.findAndCountAll(options);
    }

    pack_finance_list(retData) {
        let data = {
            total: _.get(retData, 'count', 0),
            list: []
        };

        _.get(retData, 'rows', []).forEach(elem => {
            let row = elem.toJSON();
            row = _.assign({}, _.get(row, 'stock_info', {}), row);
            _.unset(row, 'stock_info');
            data.list.push(row);
        });

        return data;
    }
}

exports = module.exports = new FinanceDAO;