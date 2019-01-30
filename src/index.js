import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom'
import setting from './components/rakam/index'
import view from './components/view/index'
import chartDetails from './components/rakam/chartsArea/chartsArea'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu
// const anozjy = () => <h2>anozjy</h2>

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      current: '/lambda'
    }
  }
  componentDidMount () {
    this.setState({current: window.location.pathname})
  }
  onCollapse (collapsed) {
    this.setState({ collapsed })
  }
  handleClick (e) {
    this.setState({
        current: e.key
    })
  }
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse.bind(this)}
            >
            <Menu theme="dark"
                  mode="inline"
                  defaultOpenKeys={['sub1']}
                  onClick={this.handleClick.bind(this)}
                  selectedKeys={[this.state.current]}
            >
              <SubMenu
                key="sub1"
                title={<span><Icon type="user" /><span>app</span></span>}
              >
                {/* <Menu.Item key="/lambda/setting">
                  <Link to="/lambda/setting">setting</Link>
                </Menu.Item> */}
                <Menu.Item key="/lambda/view">
                  <Link to="/lambda/view">view</Link>
                </Menu.Item>
                {/* <Menu.Item key="/lambda/anozjy">
                  <Link to="/lambda/anozjy">anozjy</Link>
                </Menu.Item> */}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: '16px' }}>
              <Switch>
                <Redirect exact from="/lambda" to="/lambda/view" />
                <Route  path="/lambda/setting" component={setting} />
                <Route exact path="/lambda/view" component={view} />
                {/* <Route path="/lambda/anozjy" component={anozjy} /> */}
                <Route path="/lambda/view/:name" component={chartDetails} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              rakam ©2019 Created by anozjy
            </Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))