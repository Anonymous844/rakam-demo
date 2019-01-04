import React from 'react'
import { Row, Col } from 'antd'
import './index.css'

import SqlArea from './sqlArea/sqlArea'
import ChartsArea from './chartsArea/chartsArea'
import ConfigArea from './configArea/configArea'

export default class rakam extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Row gutter={10}>
          <Col span={18}>
            <div>
              <SqlArea></SqlArea>
              <ChartsArea></ChartsArea>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <ConfigArea></ConfigArea>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}