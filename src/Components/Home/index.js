import React, { Component } from 'react'
import { Layout } from 'antd'

import Navigation from './Navigation'
import Contents from './Content'
import FooterComponent from './Footer'

class App extends Component {
  
  render() {
    const { Sider, Header, Content, Footer } = Layout
    return (
      <Layout>
        <Sider>
          <Navigation />
        </Sider>
        <Layout>
          <Header className="banner">
            Theme: Dark/Light; Notification Icon
          </Header>
          <Content>
            <Contents />
          </Content>
          <Footer>
            <FooterComponent />
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default App