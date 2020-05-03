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
  searchProfessionalsBySkills
}) => {
  return (
    <Spin spinning={isLoading} tip="Loading...">
      <div className="inner-wrapper">
        <div className="steps-content">
          <div className="steps-header">
            <h3>Look for Professionals</h3>
          </div>
          <div className={isPaid ? 'search-container' : 'unpaid-container'}>
              <div className="search-form">
                <FormSection name="searchForm">
                  <SearchForm
                    isPaid={isPaid}
                    formValues={formValues}
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
