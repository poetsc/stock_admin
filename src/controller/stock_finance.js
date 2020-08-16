'use strict'

const _ = require('lodash');
const {
    finance_display,
    pack_finance_list
} = require('../dao/stock_finance');

class StockFinance {
    constructor() {}

    async fn_finance_display(ctx, next) {
        try {
            console.info('StockFinance|fn_finance_display|req ',JSON.stringify(ctx.request,null,4))
            const query = _.assignIn({}, ctx.request.body);
            const ret = await finance_display(query);
            const packdata = pack_finance_list(ret);
            
            ctx.response.body = {
                code: 0,
                message: 'success',
                data: packdata
            };
        } catch (err) {
            console.error(`controller|fn_store_display|error:${err}`);
            ctx.response.body = {
                code: 406500,
                message: err.message,
            };
        }
    }
}

let stockFinance = new StockFinance;

exports = module.exports = {
    'POST /stock/admin/finance/display': stockFinance.fn_finance_display,
}