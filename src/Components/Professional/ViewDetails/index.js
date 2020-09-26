import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Timesheet from './Timesheet'
import Profile from './Profile'
import SecurityAndLogin from './Security'
import Contact from './Contact'

const ViewDetails = ({
  userId,
  isLoading,
  collapsed,
  onCollapse,
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
  modifyBankDetails
}) => {
  const { Sider, Footer, Content } = Layout
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
              <Icon type="snippets" />
              <span>Timesheets</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/professional/${userId}/profile`}>
              <Icon type="profile" />
              <span>View Profile</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/professional/${userId}/security`}>
              <Icon type="lock" />
              <span>Security & Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/professional/${userId}/contact`}>
              <Icon type="mail" />
              <span>Contact Us</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='inner-body-wrapper'>
        <Content>
          <Switch>
            <Route path="/professional/:userId/timesheet" component={Timesheet} />
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
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    </Layout>
  )
}

export default ViewDetails
