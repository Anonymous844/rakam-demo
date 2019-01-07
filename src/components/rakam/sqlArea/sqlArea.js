import React from 'react'
import { Button, Select, Divider } from 'antd'

const Option = Select.Option

export default class SqlArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sqlStr: ''
    }
    this.changeSql = this.changeSql.bind(this)
    this.runSql = this.runSql.bind(this)
  }
  changeSql (e) {
    this.setState({
      sqlStr: e.target.value
    })
  }
  runSql () {
    console.log(this.state.sqlStr)
  }
  render () {
    return (
      <div className="main-container mgb10">
        <div style={{height: '300px'}}>
          <textarea className="input-sql" style={{borderColor: '#ccc'}} value={this.state.sqlStr} onChange={(e) => this.changeSql(e)}></textarea>
        </div>
        <div className=" border button-group clearfix">
          <Button className="pull-right mgl10" onClick={() => this.runSql()}>RUN</Button>
          <Button className="pull-right mgl10">Save as new</Button>
          <Button className="pull-right">Save</Button>
          <Divider className="pull-right" type="vertical" style={{height: 32}}></Divider>
          <Select className="pull-right mgl10" style={{width: '120px'}} defaultValue="1000">
            <Option value="1000">1000</Option>
            <Option value="100">100</Option>
            <Option value="10">10</Option>
          </Select>
          <Select className="pull-right" style={{width: '120px'}} defaultValue="Schema">
            <Option value="Schema">Schema</Option>
            <Option value="Table">Table</Option>
            <Option value="Column">Column</Option>
          </Select>
        </div>
      </div>
    )
  }
}