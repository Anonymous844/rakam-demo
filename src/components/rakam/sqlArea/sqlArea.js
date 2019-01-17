import React from 'react'
import { Button, Select, Divider } from 'antd'

const Option = Select.Option

export default class SqlArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sqlStr: ''
    }
    this.changeSql = this.changeSql.bind(this)
    this.runSql = this.runSql.bind(this)
  }
  changeSql (e) {
    this.setState({
      sqlStr: e.target.value
    })
  }
  runSql () {
    let data = {
      sql: this.state.sqlStr
    }
    fetch('http://144.34.208.247:8080/lambda/test/db', {
    // fetch('/lambda/test/db', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Authorization': ''
      },
      mode: 'cors',
      body: JSON.stringify(data)
    })
    .then(req => req.json())
    .then(req => {
      console.log(req)
      this.getChartData(req)
    })
  }
  getChartData (data) {
    // let data = {
    //   "attributes": {
    //     "list": [
    //       {
    //         "balanceMain": "THLG",
    //         "balanceMainDesc": "宜昌桃花岭饭店",
    //         "code": "001",
    //         "descript": "支付宝扫码-宜昌桃花岭饭店",
    //         "listOrder": 3,
    //         "mainType": "group",
    //         "type": 2,
    //         "cycle": "auto",
    //         "main": true,
    //         "halt": null,
    //         "check": null
    //       },
    //       {
    //         "balanceMain": "THLG",
    //         "balanceMainDesc": "宜昌桃花岭饭店",
    //         "code": "002",
    //         "descript": "微信扫码-宜昌桃花岭饭店",
    //         "listOrder": 4,
    //         "mainType": "group",
    //         "type": 1,
    //         "cycle": "auto",
    //         "main": true,
    //         "halt": null,
    //         "check": null
    //       }
    //     ]
    //   },
    //   "msg": "账户列表",
    //   "success": true
    // }
    this.props.getData(data.attributes.list)
  }
  render () {
    return (
      <div className="main-container mgb10">
        <div style={{height: '300px'}}>
          <textarea className="input-sql" style={{borderColor: '#ccc'}} value={this.state.sqlStr} onChange={(e) => this.changeSql(e)}></textarea>
        </div>
        <div className=" border button-group clearfix">
          <Button className="pull-right mgl10" onClick={() => this.runSql()}>RUN</Button>
          <Button className="pull-right mgl10">Save as new</Button>
          <Button className="pull-right">Save</Button>
          <Divider className="pull-right" type="vertical" style={{height: 32}}></Divider>
          <Select className="pull-right mgl10" style={{width: '120px'}} defaultValue="1000">
            <Option value="10">10</Option>
            <Option value="25">25</Option>
            <Option value="100">100</Option>
            <Option value="500">500</Option>
            <Option value="1000">1000</Option>
            <Option value="5000">5000</Option>
          </Select>
          <Select className="pull-right" style={{width: '150px'}} defaultValue="Schema">
            <Option value="Schema">Schema</Option>
            <Option value="collection">collection</Option>
            <Option value="materialized view">materialized view</Option>
            <Option value="view">view</Option>
          </Select>
        </div>
      </div>
    )
  }
}