import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Alert, Button } from 'antd'
import { COMPANY_PAGES, FOOTER_TEXT } from '../../../constants'
import FindProfessionals from './FindProfessionals'
import ChangePassword from './Security'
import Profile from './Profile'
import Contact from './Contact'
import OfferRequests from './OfferRequests'

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
  changePostalCode,
  showImageModal,
  hideImageModal,
  showMessage,
  searchDateError,
  switchPage,
  pageKey,
  showPaymentForm,
  datePickerType,
  changeDatePickerType,
  searchDrawer,
  showSearchDrawer,
  hideSearchDrawer,
  week,
  currentWeek,
  skipCurrentWeek,
  resetWeek,
  searchInputValue,
  offerModal,
  showOfferModal,
  hideOfferModal,
  offerFormShifts,
  submitOfferRequest,
  offers,
  requestTypes,
  indeterminate,
  allRequests,
  changeRequestType,
  changeAllRequestTypes,
  updateOfferStatus
}) => {
  const { Sider, Footer, Content } = Layout
  const { searchPage, offersPage, securityPage, profilePage, contactPage } = COMPANY_PAGES
  const { label, author, profileLink } = FOOTER_TEXT
  return (
    <Layout style={{ minHeight: '90vh' }}>
      <Sider style={{ marginTop: '-4px' }}
        breakpoint="xl"
        collapsedWidth="0"
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
            isPaid ? '' :
            <div className="error-alert">
              <Alert
                message={<><strong>Payment Pending: </strong> You have not paid yet, please make your payment to use all features of this application. To make payment please<Button type="link" className="payment-button" onClick={showPaymentForm}>Click here</Button> </>}
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
                company={company}
                formValues={formValues}
                professionals={professionals}
                isLoading={isLoading}
                documentModal={documentModal}
                documentModalType={documentModalType}
                showDocumentModal={showDocumentModal}
                hideDocumentModal={hideDocumentModal}
                getDocumentType={getDocumentType}
                imageModal={imageModal}
                searchInputValue={searchInputValue}
                showImageModal={showImageModal}
                hideImageModal={hideImageModal}
                showMessage={showMessage}
                searchDateError={searchDateError}
                datePickerType={datePickerType}
                changeDatePickerType={changeDatePickerType}
                searchProfessionalsBySkills={searchProfessionalsBySkills}
                searchDrawer={searchDrawer}
                showSearchDrawer={showSearchDrawer}
                hideSearchDrawer={hideSearchDrawer}
                week={week}
                currentWeek={currentWeek}
                skipCurrentWeek={skipCurrentWeek}
                resetWeek={resetWeek}
                offerModal={offerModal}
                showOfferModal={showOfferModal}
                hideOfferModal={hideOfferModal}
                offerFormShifts={offerFormShifts}
                submitOfferRequest={submitOfferRequest}
              />
            </Route>
            <Route path="/company/:userId/requests">
              <OfferRequests
                offers={offers}
                requestTypes={requestTypes}
                indeterminate={indeterminate}
                allRequests={allRequests}
                changeRequestType={changeRequestType}
                changeAllRequestTypes={changeAllRequestTypes}
                updateOfferStatus={updateOfferStatus}
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
                changePostalCode={changePostalCode}
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
        <Footer style={{ textAlign: 'center' }}>
            {label} <a href={profileLink} target="_blank" rel="noopener noreferrer">{author}</a>
        </Footer>
        </Layout>
    </Layout>
  )
}

export default ViewDetails
