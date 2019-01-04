import React from 'react'
import { Tabs } from 'antd'

const TabPane = Tabs.TabPane

export default class ConfigArea extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Tabs type="card" tabPosition="right" defaultActiveKey="tab1" size="large" tabBarGutter={0} tabBarStyle={{borderRadius: 0}}>
          <TabPane tab="tab1" key="tab1" style={{height: 300}}>tab1</TabPane>
          <TabPane tab="tab2" key="tab2">tab2</TabPane>
          <TabPane tab="tab3" key="tab3">tab3</TabPane>
        </Tabs>
      </div>
    )
  }
}