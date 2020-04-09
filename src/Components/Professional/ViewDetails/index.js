import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Timesheet from './Timesheet'
import Profile from './Profile'
import SecurityAndLogin from './Security'


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
  getDocumentType
}) => {
  const { Sider, Footer, Content } = Layout
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider style={{ marginTop: '-4px' }}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Link to={`/professional/${userId}/timesheet`}>
              <Icon type="snippets" />
              <span>Timesheets</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/professional/${userId}/profile`}>
              <Icon type="profile" />
              <span>View Profile</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/professional/${userId}/security`}>
              <Icon type="lock" />
              <span>Security & Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Icon type="mail" />
            <span>Contact Us</span>
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
              />
            </Route>
            <Route path="/professional/:userId/security">
              <SecurityAndLogin
                updateSecurityandLoginDetails={updateSecurityandLoginDetails}
                formValues={formValues}
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
