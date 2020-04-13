import React from 'react'
import { Spin } from 'antd'
import ProfessionalsList from './ProfessionalsList'
import SearchForm from './SearchForm'
import { FormSection } from 'redux-form'

const FindProfessionas = ({
  isPaid,
  isLoading,
  professionals,
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
                    searchProfessionalsBySkills={searchProfessionalsBySkills}
                  />
                </FormSection>
              </div>
              <div className="professionals-list">
                <ProfessionalsList
                  professionals={professionals}
                />
              </div>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default FindProfessionas
