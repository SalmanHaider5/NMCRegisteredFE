import React from 'react'
import { and, defaultTo, not, or } from 'ramda'
import { isEmptyOrNull } from '../../utils/helpers'
import ViewDetails from './ViewDetails'
import AddDetails from './AddDetails'

export const Container = (props) => {

  const { profile, paymentSkipped } = props,
    { firstName, isPaid = false } = defaultTo({}, profile),
    paymentDone = or(isPaid, paymentSkipped),
    perfectProfile = and(not(isEmptyOrNull(firstName)), paymentDone)
    
  return (
    <>
      { perfectProfile ? <ViewDetails {...props} /> : <AddDetails {...props} /> }
    </>
  )
}
