import React, { Component } from 'react'
import { Layout } from 'antd'

import Banner from './Banner'
import Contents from './Content'
import FooterComponent from './Footer'

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Banner />
        <Contents />
        <FooterComponent />
      </Layout>
    )
  }
}

export default App