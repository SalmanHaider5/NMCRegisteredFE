import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { defaultTo, filter, length } from 'ramda'
import { Layout, Menu, Icon, Badge } from 'antd'
import { COMPANY_PAGES, FOOTER_TEXT } from '../../../constants'
import FindProfessionals from './FindProfessionals'
import ChangePassword from './Security'
import Profile from './Profile'
import Contact from './Contact'
import OfferRequests from './OfferRequests'
import { PaymentAlert } from './PaymentAlert'

const ViewDetails = (props) => {

  const {
    pageKey,
    userId,
    profile,
    offers = [],
    switchPage
  } = props

  const { Sider, Footer, Content } = Layout
  const badgeOffers = filter(offer => offer.status === 'accepted' || offer.status === 'declined' || offer.status === 'rejected', offers)
  const { searchPage, offersPage, securityPage, profilePage, contactPage } = COMPANY_PAGES
  const { label, author, profileLink } = FOOTER_TEXT
  const { isPaid = false } = defaultTo({}, profile)

  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider
        style={{ marginTop: '-4px' }}
        breakpoint="xl"
        collapsedWidth="0"
        className="menu-sider"
      >
        <Menu
          defaultSelectedKeys={[pageKey]}
          mode="inline"
          theme="dark"
          onClick={switchPage}
        >
          <Menu.Item key="1">
            <Link to={`/company/${userId}/professionals`}>
              <Icon type={searchPage.icon} />
              <span>{searchPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/company/${userId}/requests`}>
              <Icon type={offersPage.icon} />
              <span>{offersPage.label}</span>
              { length(badgeOffers) > 0 ? <Badge count={length(badgeOffers)} /> : '' }
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/company/${userId}/profile`}>
              <Icon type={profilePage.icon} />
              <span>{profilePage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/company/${userId}/changePassword`}>
              <Icon type={securityPage.icon} />
              <span>{securityPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`/company/${userId}/contact`}>
              <Icon type={contactPage.icon} />
              <span>{contactPage.label}</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='inner-body-wrapper'>
        <Content>
          {
            isPaid ? '' : <PaymentAlert {...props} />
          }
          <Switch>
            <Route path="/company/:userId/professionals">
              <FindProfessionals {...props} />
            </Route>
            <Route path="/company/:userId/requests">
              <OfferRequests {...props}/>
            </Route>
            <Route path="/company/:userId/changePassword">
              <ChangePassword {...props} />
            </Route>
            <Route path="/company/:userId/profile">
              <Profile {...props} />
            </Route>
            <Route path="/company/:userId/contact">
              <Contact {...props} />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            {label} <a href={profileLink} target="_blank" rel="noopener noreferrer">{author}</a>
        </Footer>
        </Layout>
    </Layout>
  )
}

export default ViewDetails
