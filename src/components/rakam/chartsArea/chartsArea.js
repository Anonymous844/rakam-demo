import React from 'react'
import echarts from 'echarts'
import { Table } from 'antd'


export default class ChartsArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [],
      dataSource: []
    }
  }
  componentDidMount () {
    this.getChartData()
    setTimeout(() => this.renderChart())
  }
  getChartData () {
    let data = {
      "attributes": {
        "list": [
          {
            "balanceMain": "THLG",
            "balanceMainDesc": "宜昌桃花岭饭店",
            "code": "001",
            "descript": "支付宝扫码-宜昌桃花岭饭店",
            "listOrder": null,
            "mainType": "group",
            "type": "2",
            "cycle": "auto",
            "main": true,
            "halt": null,
            "check": null
          },
          {
            "balanceMain": "THLG",
            "balanceMainDesc": "宜昌桃花岭饭店",
            "code": "002",
            "descript": "微信扫码-宜昌桃花岭饭店",
            "listOrder": null,
            "mainType": "group",
            "type": "2",
            "cycle": "auto",
            "main": true,
            "halt": null,
            "check": null
          }
        ]
      },
      "msg": "账户列表",
      "success": true
    }
    let columns = []
    let dataSource = []
    if (data.attributes.list.length) {
      for (let x in data.attributes.list[0]) {
        columns.push({
          title: x,
          dataIndex: x,
          key: x
        })
      }
      data.attributes.list.forEach((v, k) => {
        v.key = k.toString()
        dataSource.push(v)
      })
    }
    this.setState({columns: columns})
    this.setState({dataSource: dataSource})
  }
  renderChart () {
    let chart = echarts.init(document.getElementById('chart'))
    let options = {
      color: ['#02afde'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {
              type : 'shadow'
          }
      },
      legend: {
        data: [{
          name: 'fat_level',
          icon: 'circle'
        }],
        bottom: '0'
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['tsumetaRaito', 'nekoChan'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value',
              minInterval: 1
          }
      ],
      series : [
          {
              name:'fat_level',
              type:'bar',
              barWidth: '60%',
              data:[2, 1]
          }
      ]
    }
    chart.setOption(options)
  }
  render () {
    const columns = this.state.columns
    const dataSource = this.state.dataSource
    return (
      <div className="main-container border">
        <div>
          <div id="chart" style={{height: 200}}></div>
        </div>
        <div style={{minHeight: 250}}>
          <Table dataSource={dataSource} columns={columns} pagination={false}/>
        </div>
      </div>
    )
  }
}