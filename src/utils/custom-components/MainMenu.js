import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { concat, map, toString } from 'ramda'
import { Layout, Menu, Icon } from 'antd'

export const MainMenu = ({
  height = 100,
  defaultCollapsed = true,
  theme = 'dark',
  mode = 'inline',
  clickHandler,
  selectedKey,
  navPages = []
}) => {

  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  const { Sider } = Layout
  const layoutStyle = {
    minHeight: concat(toString(height), 'vh')
  }

  return (
    <Layout  style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={isCollapsed => setCollapsed(isCollapsed)}
      >
        <Menu
          theme={theme}
          mode={mode}
          onClick={clickHandler}
          defaultSelectedKeys={[selectedKey]}
        >
          {
            map(page => {
              return <Menu.Item key={page.id}>
                <Link to={page.route}>
                  <Icon type={page.icon} />
                  <span>{page.label}</span>
                </Link>
              </Menu.Item>
            }, navPages)
          }
        </Menu>
      </Sider>
    </Layout>
  )
}
