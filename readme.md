# Stock Admin

> 预览地址: https://www.xukz.com(https://www.xukz.com)

## 介绍

### 目录说明

```
- src               
  - config          配置
  - controller      控制器
  - dao             数据接口
  - model           模型
  - app.js          服务入口
- sql               SQL目录
- runjob            导入脚本
- resource          服务端资源文件

```

### 本地调试

- 目录文件夹下执行

```
npm run start:local
```

### 初始数据导入

- import stock
```
node test/import_stock.js resource/t_score_rating_test.xlsx
```

- import finance
```
node test/import_finance.js resource/t_finance_guide.xlsx
```

## 接口

### 查询公司最新财务报告

> POST /stock/admin/finance/display

- 入参

| 参数名        | 描述                                       | 是否必选 |
| ------------  | -----------------------------------------  | -------- |
| offset        | 偏移量                                     | 是       |
| count         | 每页大小                                   | 是       |
| stock_name    | 公司名称，支持模糊查找                      | 否       |
| stock_id      | 公司编号                                   | 否       |

- 返回

```json
{
    "code": 0,
    "message": "success",
    "data": {
        "total": 1,
        "list": [
            {
                "stock_id": "000001",
                "stock_name": "平安银行",
                "rating": "A",
                "report_year": "2020-03-30T15:59:17.000Z",
                "roe": "2.77",
                "net_profit": "8506000000.00",
                "profit_margin": "0.00",
                "net_asset_per": "14.55",
                "core_growth": "0.00",
                "np_growth": "14.80"
            }
        ]
    }
}
```