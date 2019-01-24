import React from 'react'
import { Row, Col } from 'antd'
import './index.css'

import SqlArea from './sqlArea/sqlArea'
import ChartsArea from './chartsArea/chartsArea'
import ConfigArea from './configArea/configArea'

export default class rakam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      config: {}
    }
  }
  // 获取请求数据
  getData (data) {
    this.setState({data: data})
  }
  // echarts重新渲染
  rerender (data) {
    this.setState({config: data})
  }
  render () {
    return (
      <div>
        <Row gutter={10}>
          <Col span={18}>
            <div>
              <SqlArea getData={data => this.getData(data)} data={this.state.data} config={this.state.config}></SqlArea>
              <ChartsArea data={this.state.data} config={this.state.config}></ChartsArea>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <ConfigArea data={this.state.data} rerender={data => this.rerender(data)}></ConfigArea>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}