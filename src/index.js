import React from "react";
import ReactDOM from "react-dom";
import './index.css'
import { Layout, Menu, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import rakam from './components/rakam/index'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu
// const rakam = () => <h2>rakam</h2>
const coldlight = () => <h2>coldlight</h2>
const anozjy = () => <h2>anozjy</h2>

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false,
      current: window.location.pathname
    }
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
                <Menu.Item key="/">
                  <Link to="/">rakam</Link>
                </Menu.Item>
                <Menu.Item key="/coldlight">
                  <Link to="/coldlight">coldlight</Link>
                </Menu.Item>
                <Menu.Item key="/anozjy">
                  <Link to="/anozjy">anozjy</Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: '16px' }}>
              <Route exact path="/" component={rakam} />
              <Route path="/coldlight" component={coldlight} />
              <Route path="/anozjy" component={anozjy} />
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