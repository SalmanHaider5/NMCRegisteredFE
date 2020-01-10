import React from 'react'
import { Layout, Button, Icon } from 'antd'

import Navigation from './Navigation'
import Contents from './Content'
import FooterComponent from './Footer'

const Home = ({ logout }) => {
  const { Sider, Header, Content, Footer } = Layout
  return(
    <div>
      <Layout>
        <Sider>
          <Navigation />
        </Sider>
        <Layout>
          <Header className="banner">
            <div className="header-buttons">
              <Button type="primary" className="logout-button" onClick={logout}>
                <Icon type="logout" /> Logout
              </Button>
            </div>
          </Header>
          <Content>
            <Contents />
          </Content>
          <Footer>
            <FooterComponent />
          </Footer>
        </Layout>
      </Layout>
    </div>
  )
}

export default Home