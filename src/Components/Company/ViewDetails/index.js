import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Alert } from 'antd'
import FindProfessionals from './FindProfessionals'
import ChangePassword from './Security'
import Profile from './Profile'
import Contact from './Contact'


const ViewDetails = ({
  userId,
  isLoading,
  collapsed,
  onCollapse,
  formValues,
  isPaid,
  company,
  changePassword,
  sendMessage,
  formName,
  editFormModal,
  showEditFormModal,
  hideEditFormModal,
  charityStatus,
  subsidiary,
  addresses,
  findAddresses,
  addressSelectHandler,
  charityStatusChange,
  subsidiaryStatusChange,
  updateCompany,
  searchProfessionalsBySkills,
  professionals,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal
}) => {
  const { Sider, Footer, Content } = Layout
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider style={{ marginTop: '-4px' }}
        breakpoint="xl"
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
            <Link to={`/company/${userId}/professionals`}>
              <Icon type="user" />
              <span>Find professionals</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/company/${userId}/profile`}>
              <Icon type="profile" />
              <span>View Profile</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/company/${userId}/changePassword`}>
              <Icon type="lock" />
              <span>Change Password</span>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={`/company/${userId}/contact`}>
              <Icon type="mail" />
              <span>Contact Us</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='inner-body-wrapper'>
        <Content>
          {
            isPaid ? '' :
            <div className="error-alert">
              <Alert
                message={<><strong>Payment Pending: </strong> You have not paid yet, please make your payment to use all features of this application. </>}
                type="error"
                showIcon
              />
            </div>
          }
          <Switch>
            <Route path="/company/:userId/professionals">
              <FindProfessionals
                userId={userId}
                isPaid={isPaid}
                formValues={formValues}
                professionals={professionals}
                isLoading={isLoading}
                documentModal={documentModal}
                documentModalType={documentModalType}
                showDocumentModal={showDocumentModal}
                hideDocumentModal={hideDocumentModal}
                getDocumentType={getDocumentType}
                imageModal={imageModal}
                showImageModal={showImageModal}
                hideImageModal={hideImageModal}
                searchProfessionalsBySkills={searchProfessionalsBySkills}
              />
            </Route>
            <Route path="/company/:userId/changePassword">
              <ChangePassword
                formValues={formValues}
                changePassword={changePassword}
              />
            </Route>
            <Route path="/company/:userId/profile">
              <Profile
                formValues={formValues}
                isLoading={isLoading}
                company={company}
                formName={formName}
                editFormModal={editFormModal}
                showEditFormModal={showEditFormModal}
                hideEditFormModal={hideEditFormModal}
                charityStatus={charityStatus}
                subsidiary={subsidiary}
                subsidiaryStatusChange={subsidiaryStatusChange}
                charityStatusChange={charityStatusChange}
                addresses={addresses}
                findAddresses={findAddresses}
                addressSelectHandler={addressSelectHandler}
                updateCompany={updateCompany}
              />
            </Route>
            <Route path="/company/:userId/contact">
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
