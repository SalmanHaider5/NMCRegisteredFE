import React from 'react'
import { Input, Form, Drawer } from 'antd'
import ProfessionalsList from './ProfessionalsList'
import SearchForm from './SearchForm'
import { FormSection } from 'redux-form'
import './professionals.css'

const FindProfessionas = ({
  isPaid,
  userId,
  isLoading,
  formValues,
  professionals,
  documentModal,
  documentModalType,
  showDocumentModal,
  hideDocumentModal,
  getDocumentType,
  imageModal,
  showImageModal,
  hideImageModal,
  searchDrawer,
  showSearchDrawer,
  hideSearchDrawer,
  showMessage,
  searchDateError,
  searchProfessionalsBySkills,
  datePickerType,
  changeDatePickerType,
  week,
  currentWeek,
  skipCurrentWeek,
  resetWeek,
  searchInputValue,
  offerModal,
  showOfferModal,
  hideOfferModal,
  company,
  offerFormShifts,
  submitOfferRequest
}) => {
  
  return (
    <div className="inner-wrapper">
      <div className="steps-content search-content">
        <div className="steps-header">
          <h3>Look for Professionals</h3>
        </div>
        <div className={isPaid ? 'search-container' : 'unpaid-container'}>
            <div className="search-form">
              <Form.Item wrapperCol={{ span: 12, offset: 6 }} style={{ paddingTop: '0px' }}>
                <Input.Search
                  value={searchInputValue}
                  placeholder="Search Professionals"
                  onClick={showSearchDrawer}
                  onSearch={showSearchDrawer}
                  readOnly
                  enterButton
                />
              </Form.Item>
              <Drawer
                title="Search Professionals"
                placement={'top'}
                className="search-drawer"
                closable={true}
                onClose={hideSearchDrawer}
                visible={searchDrawer}
                height={550}
                getContainer={false}
                style={{ position: 'absolute'}}
              >
                <FormSection name="searchForm">
                  <SearchForm
                    week={week}
                    currentWeek={currentWeek}
                    skipCurrentWeek={skipCurrentWeek}
                    resetWeek={resetWeek}
                    isPaid={isPaid}
                    hideSearchDrawer={hideSearchDrawer}
                    formValues={formValues}
                    showMessage={showMessage}
                    searchDateError={searchDateError}
                    datePickerType={datePickerType}
                    changeDatePickerType={changeDatePickerType}
                    searchProfessionalsBySkills={searchProfessionalsBySkills}
                  />
                </FormSection>
              </Drawer>
            </div>
            <div className="professionals-list">
              <ProfessionalsList
                professionals={professionals}
                documentModal={documentModal}
                getDocumentType={getDocumentType}
                documentModalType={documentModalType}
                showDocumentModal={showDocumentModal}
                hideDocumentModal={hideDocumentModal}
                imageModal={imageModal}
                formValues={formValues}
                currentWeek={currentWeek}
                showImageModal={showImageModal}
                hideImageModal={hideImageModal}
                searchInputValue={searchInputValue}
                offerModal={offerModal}
                showOfferModal={showOfferModal}
                hideOfferModal={hideOfferModal}
                company={company}
                isLoading={isLoading}
                offerFormShifts={offerFormShifts}
                submitOfferRequest={submitOfferRequest}
              />
            </div>
        </div>
      </div>
    </div>
  )
}

export default FindProfessionas
