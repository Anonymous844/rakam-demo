import React from 'react'
import echarts from 'echarts'
import { Table } from 'antd'


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
        legend: ''
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
      legend: ''
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
      xArr.forEach(d => {
        chartData.x.push(v[d])
      })
      chartData.y.push(v[chartData.legend])
    })
    this.setState({dataSource: dataSource})
    this.setState({columns: columns})
    this.setState({chartData: chartData}, () => this.renderChart())
  }
  // 重新渲染echarts图之前的拼装参数
  rerender () {
    let config = JSON.parse(JSON.stringify(this.state.chartData))
    config.showLegend = this.props.config.showLegend
    config.showLabels = this.props.config.showLabels
    this.setState({chartData: config}, () => this.renderChart())
  }
  // 渲染echarts图
  renderChart () {
    let chart = echarts.init(document.getElementById('chart'))
    const legendName = this.state.chartData.legend
    const xData = this.state.chartData.x
    const yData = this.state.chartData.y
    const showLegend = this.state.chartData.showLegend
    const showLabels = this.state.chartData.showLabels
    let options = {
      color: ['#02afde'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
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
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          minInterval: 1
        }
      ],
      series: [
        {
          name: legendName,
          type: 'bar',
          barWidth: '60%',
          label: {
            normal: {
              show: showLabels,
              position: 'inside'
            }
          },
          data: yData
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