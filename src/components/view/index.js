import React from 'react'
import { Table, message } from 'antd'
import { Link } from 'react-router-dom'

export default class view extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: true
    }
  }
  componentDidMount () {
    this.getTableData()
  }
  getTableData () {
    this.setState({loading: true})
    fetch('http://144.34.208.247:8080/lambda/web/allCharts', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    })
    .then(req => req.json())
    .then(req => {
      this.setState({loading: false})
      if (req.success) {
        let list = []
        req.attributes.list.forEach((v, k) => {
          list.push({
            key: k,
            chartName: v
          })
        })
        this.setState({
          dataSource: list
        })
      } else {
        message.error(req.msg || '获取图标名称失败')
      }
    })
  }
  render () {
    const columns = [
      {
        title: '图表名',
        dataIndex: 'chartName',
        key: 'chartName',
        render: (text) => (
          <Link to={"/lambda/view/" + text}>{text}</Link>
        )
      }
    ]
    const dataSource = this.state.dataSource
    return (
      <div className="main-container">
        <Table dataSource={dataSource} columns={columns} loading={this.state.loading}
               bordered={true} size="small"></Table>
      </div>
    )
  }
}