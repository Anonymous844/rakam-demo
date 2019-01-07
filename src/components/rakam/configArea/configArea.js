import React from 'react'
import { Tabs, Icon, Table, Checkbox, Switch, Tooltip } from 'antd'

const TabPane = Tabs.TabPane

export default class ConfigArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      curChart: 'bar',
      dataSource: [{
        key: '1',
        Fields: 'code1',
        XAxis: '123',
        YAxis: '123'
      }, {
        key: '2',
        Fields: 'code2',
        XAxis: 321,
        YAxis: 321
      }],
      columns: [{
        title: 'Fields',
        dataIndex: 'Fields',
        key: 'Fields'
      }, {
        title: 'XAxis',
        dataIndex: 'XAxis',
        key: 'XAxis',
        render: text => (<Checkbox />)
      }, {
        title: 'YAxis',
        dataIndex: 'YAxis',
        key: 'YAxis',
        render: text => (<Checkbox disabled={typeof(text) === 'number'} />)
      }, {
        title: 'Series',
        dataIndex: 'Series',
        key: 'Series',
        render: () => (<Checkbox />)
      }]
    }
  }
  changeChartType (type) {
    this.setState({curChart: type})
  }
  render () {
    const dataSource = this.state.dataSource
    const columns = this.state.columns
    return (
      <div>
        <Tabs type="card" tabPosition="right" defaultActiveKey="tab1" size="large" tabBarGutter={0} tabBarStyle={{borderRadius: 0}}>
          <TabPane tab="tab1" key="tab1" className="main-container border">
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
              <Tooltip placement="top" title="Pie">
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
                <Switch className="pull-right mgt10" defaultChecked  />
              </div>
              <div className="clearfix">
                <span className="button-label">Show Labels</span>
                <Switch className="pull-right mgt10" defaultChecked  />
              </div>
            </div>
          </TabPane>
          <TabPane tab="tab2" key="tab2" className="main-container border" style={{minHeight: 250}}>tab2</TabPane>
          <TabPane tab="tab3" key="tab3" className="main-container border" style={{minHeight: 250}}>tab3</TabPane>
        </Tabs>
      </div>
    )
  }
}