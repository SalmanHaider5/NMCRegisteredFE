import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Badge } from 'antd'
import { filter, length } from 'ramda'
import { PROFESSIONAL_PAGES, FOOTER_TEXT } from '../../../constants'
import Timesheet from './Timesheet'
import Profile from './Profile'
import SecurityAndLogin from './Security'
import Contact from './Contact'
import { OfferRequests } from './OfferRequests'

const ViewDetails = ({
  userId,
  isLoading,
  professional,
  formModal,
  formName,
  showEditFormModal,
  hideEditFormModal,
  findAddresses,
  dateHandler,
  addressSelectHandler,
  addresses,
  updateProfessionalDetails,
  getProfileStatus,
  invalid,
  updateSecurityandLoginDetails,
  formValues,
  phoneVerified,
  imageModal,
  showImageModal,
  hideImageModal,
  fileRemoveHandler,
  imageRemoveHandler,
  crbRemoveHandler,
  showDocumentModal,
  hideDocumentModal,
  documentModal,
  documentModalType,
  getDocumentType,
  sendMessage,
  pageKey,
  switchPage,
  changePostalCode,
  modifyBankDetails,
  offers,
  updateOfferStatus
}) => {
  const { Sider, Footer, Content } = Layout
  const pendingOffers = filter(offer => offer.status === 'pending', offers)
  const { timesheetsPage, offersPage, profilePage, securityPage, contactPage } = PROFESSIONAL_PAGES
  const { label, author, profileLink } = FOOTER_TEXT
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider style={{ marginTop: '-4px' }}
        breakpoint="xl"
        collapsedWidth="0"
      >
        <Menu
          onClick={switchPage}
          defaultSelectedKeys={[pageKey]}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to={`/professional/${userId}/timesheet`}>
              <Icon type={timesheetsPage.icon} />
              <span>{timesheetsPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/professional/${userId}/requests`}>
              <Icon type={offersPage.icon} />
              <span>{offersPage.label}</span>
              { length(pendingOffers) > 0 ? <Badge count={length(pendingOffers)} /> : '' }
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/professional/${userId}/profile`}>
              <Icon type={profilePage.icon} />
              <span>{profilePage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/professional/${userId}/security`}>
              <Icon type={securityPage.icon} />
              <span>{securityPage.label}</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
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
                isLoading={isLoading}
                updateOfferStatus={updateOfferStatus}
              />
            </Route>
            <Route path="/professional/:userId/profile">
              <Profile
                userId={userId}
                professional={professional}
                isLoading={isLoading}
                formModal={formModal}
                formName={formName}
                showEditFormModal={showEditFormModal}
                hideEditFormModal={hideEditFormModal}
                findAddresses={findAddresses}
                addressSelectHandler={addressSelectHandler}
                addresses={addresses}
                updateProfessionalDetails={updateProfessionalDetails}
                getProfileStatus={getProfileStatus}
                invalid={invalid}
                dateHandler={dateHandler}
                formValues={formValues}
                phoneVerified={phoneVerified}
                showImageModal={showImageModal}
                hideImageModal={hideImageModal}
                imageModal={imageModal}
                fileRemoveHandler={fileRemoveHandler}
                imageRemoveHandler={imageRemoveHandler}
                crbRemoveHandler={crbRemoveHandler}
                showDocumentModal={showDocumentModal}
                hideDocumentModal={hideDocumentModal}
                documentModal={documentModal}
                documentModalType={documentModalType}
                getDocumentType={getDocumentType}
                changePostalCode={changePostalCode}
                modifyBankDetails={modifyBankDetails}
              />
            </Route>
            <Route path="/professional/:userId/security">
              <SecurityAndLogin
                updateSecurityandLoginDetails={updateSecurityandLoginDetails}
                formValues={formValues}
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
            {label} <a href={profileLink} target="_blank" rel="noopener noreferrer">{author}</a>
        </Footer>
        </Layout>
    </Layout>
  )
}

export default ViewDetails
