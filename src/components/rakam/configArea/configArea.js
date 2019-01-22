import React from 'react'
import { Tabs, Icon, Table, Checkbox, Switch, Tooltip } from 'antd'

export default class ConfigArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      curChart: 'bar',
      checkboxObj: {},
      showLegend: true,
      showLabels: true,
      dataSource: [],
      columns: [{
        title: 'Fields',
        dataIndex: 'Fields',
        key: 'Fields'
      }, {
        title: 'XAxis',
        dataIndex: 'XAxis',
        key: 'XAxis',
        render: (text, record) => (
          <Checkbox checked={this.state.checkboxObj[record.Fields].x}
                    onChange={(e) => this.changeAxis(record, 'x', e)}
                    disabled={!(typeof(text) === 'string' || typeof(text) === 'number')} />
        )
      }, {
        title: 'YAxis',
        dataIndex: 'YAxis',
        key: 'YAxis',
        render: (text, record) => (
          <Checkbox checked={this.state.checkboxObj[record.Fields].y}
                    onChange={(e) => this.changeAxis(record, 'y', e)}
                    disabled={typeof(text) !== 'number'} />
        )
      }]
    }
  }
  componentDidUpdate (prevProps) {
    if (this.props.data !== prevProps.data) {
      this.dataFormat()
    }
  }
  // 数据拼装
  dataFormat () {
    let dataSource = []
    let checkboxObj = {}
    let index = 0
    for (let x in this.props.data[0]) {
      dataSource.push({ // 表格数据拼装
        key: index++,
        Fields: x,
        XAxis: this.props.data[0][x],
        YAxis: this.props.data[0][x],
      })
      checkboxObj[x] = { // 表格中checkbox初始化
        x: false,
        y: false
      }
    }
    for (let x in checkboxObj) { // checkbox初始赋值，X轴
      if (typeof(this.props.data[0][x]) === 'string') {
        checkboxObj[x].x = true
        break
      }
    }
    for (let x in checkboxObj) { // checkbox初始赋值，Y轴
      if (typeof(this.props.data[0][x]) === 'number') {
        checkboxObj[x].y = true
        break
      }
    }
    this.setState({curChart: 'bar'})
    this.setState({dataSource: dataSource})
    this.setState({checkboxObj: checkboxObj})
  }
  // 图标类型切换
  changeChartType (type) {
    this.setState({curChart: type}, () => this.props.rerender(this.state))
  }
  // checkbox切换
  changeAxis (row, current, e) {
    let checkboxObj = this.state.checkboxObj
    checkboxObj[row.Fields].x = false
    checkboxObj[row.Fields].y = false
    checkboxObj[row.Fields][current] = e.target.checked
    this.setState({checkboxObj}, () => this.props.rerender(this.state))
  }
  // switch切换
  changeSwitch (e, type) {
    this.setState({[type]: e}, () => this.props.rerender(this.state))
  }
  render () {
    const dataSource = this.state.dataSource
    const columns = this.state.columns
    return (
      dataSource.length ?
      (<div className="main-container border">
        <div className="pd10">
          <Icon type="appstore" className="icon" />
          <span className="mgl10" style={{fontSize: 16, color: '#000', fontWeight: 700}}>Series</span>
        </div>
        <div className="pd10 mgt10">
          <Tooltip placement="top" title="Line">
            <span className={this.state.curChart === 'line' ? 'pointer icon-style active' : 'pointer icon-style'}
                  onClick={() => this.changeChartType('line')}>
              <Icon type="line-chart" className="icon" />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Area">
            <span className={this.state.curChart === 'area' ? 'pointer icon-style mgl10 active' : 'pointer icon-style mgl10'}
                  onClick={() => this.changeChartType('area')}>
              <Icon type="area-chart" className="icon" />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="pie">
            <span className={this.state.curChart === 'pie' ? 'pointer icon-style mgl10 active' : 'pointer icon-style mgl10'}
                  onClick={() => this.changeChartType('pie')}>
              <Icon type="pie-chart" className="icon" />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Bar">
            <span className={this.state.curChart === 'bar' ? 'pointer icon-style mgl10 active' : 'pointer icon-style mgl10'}
                  onClick={() => this.changeChartType('bar')}>
              <Icon type="bar-chart" className="icon" />
            </span>
          </Tooltip>
          <Tooltip placement="top" title="Scatter">
            <span className={this.state.curChart === 'scatter' ? 'pointer icon-style mgl10 active' : 'pointer icon-style mgl10'}
                  onClick={() => this.changeChartType('scatter')}>
              <Icon type="dot-chart" className="icon" />
            </span>
          </Tooltip>
        </div>
        <div className="pd10">
          <Table dataSource={dataSource} columns={columns} pagination={false} size="small"></Table>
        </div>
        <div className="pd10">
          <div className="clearfix">
            <span className="button-label">Show Legend</span>
            <Switch className="pull-right mgt10" defaultChecked checked={this.state.showLegend}
                    onChange={(e) => this.changeSwitch(e, 'showLegend')} />
          </div>
          <div className="clearfix">
            <span className="button-label">Show Labels</span>
            <Switch className="pull-right mgt10" defaultChecked checked={this.state.showLabels}
                    onChange={(e) => this.changeSwitch(e, 'showLabels')} />
          </div>
        </div>
      </div>)
      :
      (<div className="main-container border" style={{height: 400}}></div>)
    )
  }
}