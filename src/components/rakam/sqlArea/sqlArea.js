import React from 'react'
import { Button, Select, Divider, message, Modal, Input } from 'antd'

const Option = Select.Option

export default class SqlArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sqlStr: '',
      visible: false,
      chartName: '',
      loading: false
    }
    this.changeSql = this.changeSql.bind(this)
    this.runSql = this.runSql.bind(this)
    this.showModal = this.showModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.saveFunc = this.saveFunc.bind(this)
    this.editName = this.editName.bind(this)
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
    fetch('http://144.34.208.247:8080/lambda/web/db', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data)
    })
    .then(req => req.json())
    .then(req => {
      if (req && !req.success) {
        message.error(req.msg)
        return false
      }
      this.getChartData(req)
    })
  }
  showModal () {
    this.setState({
      chartName: '',
      visible: true
    })
  }
  saveFunc () {
    if (!this.state.chartName) {
      message.error('请输入名称')
      return false
    }
    let data = {}
    let xAxis = []
    let yAxis = ''
    let config = this.props.config
    for (let x in config.checkboxObj) {
      if (config.checkboxObj[x].x) {
        xAxis.push(x)
      }
      if (config.checkboxObj[x].y) {
        yAxis = x
      }
    }
    data.legendShow = config.showLegend
    data.legendName = yAxis
    data.seriesName = yAxis
    data.seriesType = config.curChart
    data.seriesShow = config.showLabels
    data.currentSql = this.state.sqlStr
    data.chartsName = this.state.chartName
    data.xaxisData = xAxis.join(',')
    data.yaxisData = yAxis
    this.setState({loading: !this.state.loading})
    fetch('http://144.34.208.247:8080/lambda/web/addCharts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(data)
    })
    .then(req => req.json())
    .then(req => {
      if (req.success) {
        message.success(req.msg)
      } else {
        message.error(req.msg)
        this.setState({
          loading: !this.state.loading
        })
        return false
      }
      this.setState({
        loading: !this.state.loading,
        visible: false,
        chartName: ''
      })
    })
  }
  editName (e) {
    this.setState({
      chartName: e.target.value
    })
  }
  closeModal () {
    this.setState({
      visible: false
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
          <Button className="pull-right mgl10" onClick={this.runSql}>RUN</Button>
          <Button className="pull-right mgl10">Save as new</Button>
          <Button className="pull-right" onClick={this.showModal}>Save</Button>
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
        <Modal visible={this.state.visible} title="提示" onOk={this.saveFunc} onCancel={this.closeModal} confirmLoading={this.state.loading}>
          <Input type="text" placeholder="请输入名称" value={this.state.chartName} onChange={this.editName} />
        </Modal>
      </div>
    )
  }
}