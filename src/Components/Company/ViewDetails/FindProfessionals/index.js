import React from 'react'
import { Spin } from 'antd'
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
  showMessage,
  searchDateError,
  searchProfessionalsBySkills,
  datePickerType,
  changeDatePickerType
}) => {
  
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="inner-wrapper">
        <div className="steps-content search-content">
          <div className="steps-header">
            <h3>Look for Professionals</h3>
          </div>
          <div className={isPaid ? 'search-container' : 'unpaid-container'}>
              <div className="search-form">
                <FormSection name="searchForm">
                  <SearchForm
                    isPaid={isPaid}
                    formValues={formValues}
                    showMessage={showMessage}
                    searchDateError={searchDateError}
                    datePickerType={datePickerType}
                    changeDatePickerType={changeDatePickerType}
                    searchProfessionalsBySkills={searchProfessionalsBySkills}
                  />
                </FormSection>
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
                  showImageModal={showImageModal}
                  hideImageModal={hideImageModal}
                />
              </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default FindProfessionas
