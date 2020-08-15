'use strict'

const path = require('path');
const xlsx = require("xlsx");


const {
    stock_create
} = require('../src/dao/stock_dao');

const parseXLSX = async ({
    filename,
    sheetname
}) => {
    const workbook = xlsx.readFile(filename);
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);

    console.log(`parsing ${filename} with ${rows.length} rows`);

    return rows;
}

const main = async () => {
    const filename = path.join(__dirname, '../', process.argv[process.argv.length - 1]);

    const sheetname = "得分";

    const stocks = (
        await parseXLSX({
            filename,
            sheetname,
        })
    ).filter((n) => n.stock_id !== "" && n.stock_name !== "");

    console.log(`creating ${stocks.length} stock`);

    stocks.forEach(async (stock) => {
        console.log(JSON.stringify(stock, null, 4));
        await stock_create(stock).catch((e) => console.error(e));
    });
}

main();