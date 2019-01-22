import React from 'react'
import echarts from 'echarts'
import { Table, message } from 'antd'

let chart = null

export default class ChartsArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      columns: [],
      dataSource: [],
      chartData: {
        showLegend: true,
        showLabels: true,
        x: [],
        y: [],
        legend: '',
        type: 'bar'
      }
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.data !== prevProps.data) {
      this.dataFormat()
    }
    if (this.props.config !== prevProps.config) {
      this.rerender()
    }
  }
  // 数据拼装
  dataFormat () {
    let dataSource = []
    let columns = []
    let chartData = {
      showLegend: true,
      showLabels: true,
      x: [],
      y: [],
      legend: '',
      type: 'bar'
    }
    for (let x in this.props.data[0]) { // 表头拼装
      columns.push({
        title: x,
        dataIndex: x,
        key: x
      })
    }
    this.props.data.forEach(v => {
      dataSource.push(v)
    })
    dataSource = JSON.parse(JSON.stringify(dataSource))
    dataSource.forEach((v, k) => { // 表格数据拼装
      v.key = k
    })
    // 图 数据拼装
    let xArr = []
    for (let x in this.props.data[0]) {
      if (typeof(this.props.data[0][x]) === 'string') {
        xArr.push(x)
        break
      }
    }
    for (let x in this.props.data[0]) {
      if (typeof(this.props.data[0][x]) === 'number') {
        chartData.legend = x
        break
      }
    }
    this.props.data.forEach(v => {
      let arr = []
      xArr.forEach(d => {
        arr.push(v[d])
      })
      chartData.x.push(arr.join(','))
      chartData.y.push(v[chartData.legend])
    })
    this.setState({dataSource: dataSource})
    this.setState({columns: columns})
    this.setState({chartData: chartData}, () => this.renderChart())
  }
  // 重新渲染echarts图之前的拼装参数
  rerender () {
    let config = JSON.parse(JSON.stringify(this.state.chartData))
    let checkboxObj = this.props.config.checkboxObj
    let xArr = []
    let yNum = 0
    config.showLegend = this.props.config.showLegend
    config.showLabels = this.props.config.showLabels
    config.x = []
    config.y = []
    config.type = this.props.config.curChart
    for (let x in checkboxObj) {
      if (checkboxObj[x].x) {
        xArr.push(x)
      }
      if (checkboxObj[x].y) {
        config.legend = x
        if (++yNum > 1) {
          this.clearChart()
          message.error('参数错误')
          return false
        }
      }
    }
    if (!xArr.length) {
      this.clearChart()
      message.error('参数错误')
      return false
    }
    if (!yNum) {
      this.clearChart()
      message.error('参数错误')
      return false
    }
    this.props.data.forEach(v => {
      let arr = []
      xArr.forEach(d => {
        arr.push(v[d])
      })
      config.x.push(arr.join(','))
      config.y.push(v[config.legend])
    })
    this.setState({chartData: config}, () => this.renderChart())
  }
  // 渲染echarts图
  renderChart () {
    chart = echarts.init(document.getElementById('chart'))
    const legendName = this.state.chartData.legend
    const xData = this.state.chartData.x
    const yData = this.state.chartData.y
    const showLegend = this.state.chartData.showLegend
    const showLabels = this.state.chartData.showLabels
    const type = this.state.chartData.type
    let options = {
      color: ['#02afde'],
      tooltip: {
        trigger: 'item',
        formatter: (param) => {
          return param.seriesName + '<br />' + param.marker + param.name + '：' + param.value
        }
      },
      legend: {
        show: showLegend,
        data: [{
          name: legendName,
          icon: 'circle'
        }],
        bottom: '0'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          show: true,
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          show: true,
          type: 'value',
          minInterval: 1
        }
      ],
      series: [
        {
          name: legendName,
          type: type === 'area' ? 'line' : type,
          barWidth: '60%',
          label: {
            normal: {
              show: showLabels,
              position: 'inside'
            }
          },
          areaStyle: type === 'area' ? {} : null,
          data: yData
        }
      ]
    }
    if (type === 'pie') {
      let data = []
      for (let x in xData) {
        data.push({
          name: xData[x],
          value: yData[x]
        })
      }
      options = {
        color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        tooltip: {
          trigger: 'item',
          formatter: (param) => {
            return param.seriesName + '<br />' + param.marker + param.name + '：' + param.value + '(' + param.percent + '%)'
          }
        },
        legend: {
          show: showLegend,
          data: xData.map((v) => {
            return {
              icon: 'circle',
              name: v
            }
          }),
          bottom: '0'
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [{
          name: legendName,
          type: type,
          data: data,
          label: {
            show: false
          }
        }]
      }
    }
    chart.setOption(options)
  }
  clearChart () {
    chart.dispose()
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