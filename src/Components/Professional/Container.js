import React from 'react'
import { not, prop } from 'ramda'
import { isEmptyOrNull } from '../../utils/helpers'
import ViewDetails from './ViewDetails'
import AddDetails from './AddDetails'

export const Container = (props) => {

  const { profile } = props,
    { bankDetails } = profile,
    perfectProfile = not(isEmptyOrNull(prop('insurance', bankDetails)))
    
  return (
    <>
      { perfectProfile ? <ViewDetails {...props} /> : <AddDetails {...props} /> }
    </>
  )
}
