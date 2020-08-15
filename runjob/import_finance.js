'use strict'

const path = require('path');
const xlsx = require("xlsx");
const _ = require('lodash');


const {
    finance_create
} = require('../src/dao/stock_finance');

const parseXLSX = async ({
    filename,
    sheetname
}) => {
    const workbook = xlsx.readFile(filename, {
        cellDates: true
    });
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);

    console.log(`parsing ${filename} with ${rows.length} rows`);

    return rows;
}

const main = async () => {
    const filename = path.join(__dirname, '../', process.argv[process.argv.length - 1]);

    const sheetname = "t_finance_guide";

    const finances = (
        await parseXLSX({
            filename,
            sheetname,
        })
    ).filter((n) => n.stock_id !== "");

    console.log(`creating ${finances.length} stock`);

    for(let f of finances){
        const finance = {
            stock_id: _.get(f, 'stock_id'),
            report_year: _.get(f, 'Report_year', ''),
            roe: _.get(f, 'ROE', '0'),
            net_profit: _.get(f, 'Net_profit', '0'),
            profit_margin: _.get(f, 'profit_margin', '0'),
            net_asset_per: _.get(f, 'net_asset_per', '0'),
            core_growth: _.get(f, 'core_growth', '0'),
            np_growth: _.get(f, 'NP_growth', '0'),
        }
        console.log(JSON.stringify(finance, null, 4));
        await finance_create(finance).catch((e) => console.error(e));
    };
}

main();