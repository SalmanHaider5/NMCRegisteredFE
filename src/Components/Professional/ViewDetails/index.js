import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Badge } from 'antd'
import { defaultTo, filter, length } from 'ramda'
import { PROFESSIONAL_PAGES, FOOTER_TEXT } from '../../../constants'
// import { PROFESSIONAL_PAGES } from '../../../constants'
import Timesheet from './Timesheet'
import Profile from './Profile'
import SecurityAndLogin from './Security'
import Contact from './Contact'
import { OfferRequests } from './OfferRequests'

const ViewDetails = (props) => {

  const {
    userId,
    profile,
    pageKey,
    switchPage,
    phoneVerified,
    formValues,
    addresses,
    formInvalid,
    showEditFormModal,
    dateHandler,
    formName,
    emailForm,
    updateEmail,
    formModal,
    phoneForm,
    updatePhone,
    sendMessage,
    findAddresses,
    updateOfferStatus,
    addressSelectHandler,
    changePostalCode,
    imageRemoveHandler,
    modifyBankDetails,
    hideEditFormModal,
    updateProfessionalDetails,
    updateSecurityandLoginDetails
  } = props

  const { offers = [] } = defaultTo({}, profile)
  const { Sider, Footer, Content } = Layout
  const pendingOffers = filter(offer => offer.status === 'pending', offers)
  const { timesheetsPage, offersPage, profilePage, securityPage, contactPage } = PROFESSIONAL_PAGES
  const { label } = FOOTER_TEXT
  // const { label, author, profileLink } = FOOTER_TEXT

  return (
    <Layout>
      <Sider
        breakpoint="xl"
        collapsedWidth="0"
        className="menu-sider"
      >
        <Menu
          onClick={switchPage}
          defaultSelectedKeys={[pageKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" className="nav-list-item">
            <Link to={`/professional/${userId}/timesheet`}>
              <Icon type={timesheetsPage.icon} />
              <span>{timesheetsPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2" className="nav-list-item">
            <Link to={`/professional/${userId}/requests`}>
              <Icon type={offersPage.icon} />
              <span>{offersPage.label}</span>
              { length(pendingOffers) > 0 ? <Badge count={length(pendingOffers)} /> : '' }
            </Link>
          </Menu.Item>
          <Menu.Item key="3" className="nav-list-item">
            <Link to={`/professional/${userId}/profile`}>
              <Icon type={profilePage.icon} />
              <span>{profilePage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4" className="nav-list-item">
            <Link to={`/professional/${userId}/security`}>
              <Icon type={securityPage.icon} />
              <span>{securityPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5" className="nav-list-item">
            <Link to={`/professional/${userId}/contact`}>
              <Icon type={contactPage.icon} />
              <span>{contactPage.label}</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='inner-body-wrapper'>
        <Content>
          <Switch>
            <Route path="/professional/:userId/timesheet" component={Timesheet} />
            <Route path="/professional/:userId/requests">
              <OfferRequests
                offers={offers}
                updateOfferStatus={updateOfferStatus}
              />
            </Route>
            <Route path="/professional/:userId/profile">
              <Profile
                profile={profile}
                formValues={formValues}
                addresses={addresses}
                formInvalid={formInvalid}
                phoneVerified={phoneVerified}
                formModal={formModal}
                updateEmail={updateEmail}
                formName={formName}
                phoneForm={phoneForm}
                updatePhone={updatePhone}
                emailForm={emailForm}
                dateHandler={dateHandler}
                showEditFormModal={showEditFormModal}
                findAddresses={findAddresses}
                hideEditFormModal={hideEditFormModal}
                addressSelectHandler={addressSelectHandler}
                changePostalCode={changePostalCode}
                modifyBankDetails={modifyBankDetails}
                imageRemoveHandler={imageRemoveHandler}
                updateProfessionalDetails={updateProfessionalDetails}
              />
            </Route>
            <Route path="/professional/:userId/security">
              <SecurityAndLogin
                formValues={formValues}
                updateSecurityandLoginDetails={updateSecurityandLoginDetails}
              />
            </Route>
            <Route path="/professional/:userId/contact">
              <Contact
                sendMessage={sendMessage}
              />
            </Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
            {label}
            {/* <a href={profileLink} target="_blank" rel="noopener noreferrer">{author}</a> */}
        </Footer>
        </Layout>
    </Layout>
  )
}

export default ViewDetails
