import React from 'react'
import ProfessionalsList from './ProfessionalsList'
import { SearchInitForm } from './SearchInitForm'
import './professionals.css'
import { defaultTo } from 'ramda'
import { isEmptyOrNull } from '../../../../utils/helpers'

const FindProfessionas = (props) => {

  const { profile, searchInputValue } = props
  const { isPaid = false } = defaultTo({}, profile)
  
  return (
    <div className="inner-wrapper">
      <div className="steps-content search-content">
        <div className="steps-header">
          <h3>Look for Professionals</h3>
        </div>
        <div className={isPaid ? 'search-container' : 'unpaid-container'}>
          <SearchInitForm {...props} />
            <div className="professionals-list">
              {
                isEmptyOrNull(searchInputValue) ? '' : <ProfessionalsList {...props} />
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default FindProfessionas
