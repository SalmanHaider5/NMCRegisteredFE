import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { detected } from 'adblockdetect'

import {
  concat,
  omit,
  trim,
  find,
  propEq,
  split,
  prop,
  defaultTo,
  head,
  last,
  equals,
  range,
  map,
  pickBy,
  keys,
  length,
  not,
  join,
  and,
  or
} from 'ramda'

import {
  addDetails,
  logoutUser,
  getCompanyDetails,
  clearAddresses,
  getAdresses,
  updatePassword,
  contactUs,
  makePayment,
  updateProfile,
  searchProfessionals,
  getStripeSecret,
  sendOfferRequest,
  updateOffer,
  startProcess,
  endProcess
} from '../../actions'

import { Loader } from '../../utils/custom-components'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../constants'
import { getCompanyFormValues, getEmptyWeekForm, isEmptyOrNull, mapIndexed } from '../../utils/helpers'
import { Container } from './Container'
import Header from '../Header'

import 'moment/locale/en-gb'
import './company.css'

moment.locale('en-gb')

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      pageKey: '1',
      paymentSkipped: false,
      paymentMethod: '',
      collapsed: false,
      formName: '',
      editFormModal: false,
      documentModal: false,
      documentModalType: '',
      imageModal: false,
      searchDateError: '',
      datePickerType: 'singular',
      paypalPayment: false,
      termsDrawer: false,
      searchDrawer: false,
      termsDocumentType: 'terms',
      week: 1,
      currentWeek: [],
      searchInputValue: '',
      offerModal: false,
      offerFormShifts: [],
      professionalId: '',
      requestTypes: ['accepted', 'pending', 'declined', 'approved', 'rejected'],
      indeterminate: false,
      allRequests: true
    };
  }

  componentDidMount(){

    const {
      match: {
        params: { userId }
      },
      dispatch,
      application: {
        authentication: { auth, role }
      },
      history,
      location: { pathname }
    } = this.props

    dispatch(getCompanyDetails(userId))

    const urlKey = last(split('/', pathname))

    if(equals(urlKey, 'professionals')){
      this.setState({ pageKey: '1' })
    }
    else if(equals(urlKey, 'requests')){
      this.setState({ pageKey: '2' })
    }
    else if(equals(urlKey, 'profile')){
      this.setState({ pageKey: '3' })
    }
    else if(equals(urlKey, 'changePassword')){
      this.setState({ pageKey: '4' })
    }
    else if(equals(urlKey, 'contact')){
      this.setState({ pageKey: '5' })
    }

    if(not(auth) ||  not(equals(role, 'company'))){
      history.push('/')
    }
    
  }

  showOfferModal = (selectedProfessional) => {
    
    const {
      company: { professionals }
    } = this.props

    const { currentWeek } = this.state

    const options = mapIndexed((day, index) => {
      const professional = find(propEq('userId', selectedProfessional))(professionals[index])
      const shift = isEmptyOrNull(professional) ? `N/A` : `${professional.shift} (${professional.time})`
      const value = `${moment(day).format('LL')} - ${shift}`
      return { label: value, value, disabled: isEmptyOrNull(professional) }
    }, currentWeek)

    this.setState({
      offerFormShifts: options,
      offerModal: true,
      professionalId: selectedProfessional
    })
    
  }

  submitOfferRequest = () => {

    const {
      formValues: { offerForm },
      match: {
        params: { userId }
      },
      dispatch,
      company: { profile }
    } = this.props

    const { address, city, county, postalCode } = profile
    const { shifts } = offerForm
    const { professionalId } = this.state

    offerForm.shifts = shifts.toString()
    offerForm.company = userId
    offerForm.address = `Post Code ${postalCode}, ${address}, ${city}, ${county}`
    offerForm.professional = professionalId.toString()

    dispatch(sendOfferRequest(userId, offerForm))

    this.hideOfferModal()
  }

  hideOfferModal = () => {
    this.setState({
      offerModal: false,
      professionalId: ''
    })
  }

  changePassword = () => {

    const {
      dispatch,
      formValues,
      match: {
        params: { userId }
      }
    } = this.props

    const { changePassword } = formValues

    const values = omit(['confirmPassword'], changePassword)

    dispatch(updatePassword(userId, values))
  }

  showSearchDrawer = () => {

    const { week } = this.state
    const weekStart = moment().add((parseInt(week) - 1) * 7, 'days').startOf('week')
    const days = range(0,7)

    const weeklyDates = map(day => {
      return moment(weekStart).add(day, 'days').format('LL')
    }, days)

    this.setState({
      currentWeek: weeklyDates,
      searchDrawer: true
    })
  }

  skipCurrentWeek = () => {

    const { dispatch } = this.props
    const { week } = this.state
    
    dispatch(change('company', 'searchForm', getEmptyWeekForm()))
    this.setState({ week: week + 1 }, () => {
      this.showSearchDrawer()
    })
  }

  resetWeek = () => {

    const { dispatch } = this.props

    dispatch(change('company', 'searchForm', getEmptyWeekForm()))

    this.setState({ week: 1 }, () => {
      this.showSearchDrawer()
    })
  }

  hideSearchDrawer = () => {
    this.setState({ searchDrawer: false })
  }

  makePaymentRequest = response => {

    const {
      dispatch,
      match: {
        params: { userId }
      },
      formValues: { balance, vat }
    } = this.props,
      { paymentIntent } = response

    const values = {}
    values.balance = balance
    values.vat = vat
    values.payDate = moment().format('YYYY-MM-DD')
    values.status = true
    values.paymentIntent = paymentIntent
    dispatch(makePayment(userId, values, 'Pay with Card'))

  }

  requestPaypalPayment = response => {

    const {
      dispatch,
      match: {
        params: { userId }
      },
      formValues: { balance, vat }
    } = this.props,
      { orderID } = response
    
    const values = {}
    values.balance = balance
    values.vat = vat
    values.payDate = moment().format('YYYY-MM-DD')
    values.status = true
    values.orderID = orderID

    dispatch(makePayment(userId, values, 'Paypal'))

  }

  initProcess = () => {
    const { dispatch } = this.props
    dispatch(startProcess())
  }

  finishProcess = () => {
    const { dispatch } = this.props
    dispatch(endProcess())
  }

  sendMessage = () => {

    const {
      dispatch,
      formValues: { contactForm },
      match: {
        params: { userId }
      }
    } = this.props

    const { subject } = contactForm
    
    contactForm.subject = join(' ', [subject, '[Contact Form | Company]'])

    dispatch(contactUs(userId, contactForm))
  }

  changePostalCode = () => {
    const { dispatch } = this.props
    dispatch(change('company', 'postalCode', ''))
    dispatch(clearAddresses())
  }

  updateCompany = () => {

    const {
      formValues,
      dispatch,
      match: {
        params: { userId }
      }
    } = this.props

    const values = omit(['contactForm', 'searchForm', 'changePassword', 'email', 'isVerified'], formValues),
      { subsidiary,  charity} = values

    if(not(subsidiary)){
      values.subsidiaryName = ''
      values.subsidiaryAddress = ''
      dispatch(change('company', 'subsidiaryName', ''))
      dispatch(change('company', 'subsidiaryAddress', ''))
    }

    if(not(charity)){
      values.charityReg = ''
      dispatch(change('company', 'charityReg', ''))
    }

    dispatch(updateProfile(userId, values))
    dispatch(change('company', 'password', ''))
    this.hideEditFormModal()
  }

  saveDetails = () => {
    
    const {
      dispatch,
      formValues,
      match: {
        params: { userId }
      }
    } = this.props

    const values = omit(['changePassword', 'contactForm', 'searchForm'], formValues)

    if(not(values.subsidiary)){
      values.subsidiaryName = ''
      values.subsidiaryAddress = ''
      dispatch(change('company', 'subsidiaryName', ''))
      dispatch(change('company', 'subsidiaryAddress', ''))
    }
    if(not(values.charity)){
      values.charityReg = ''
      dispatch(change('company', 'charityReg', ''))
    }
    dispatch(addDetails(userId, values))
    dispatch(reset('company'))
  }

  logout = () => {
    
    const {
      dispatch,
      application: { auth, role },
      history
    } = this.props

    dispatch(logoutUser())

    if(not(auth) && not(equals(role, 'company'))){
      history.push('/')
    }

  }

  updateOfferStatus = (offerId, status) => {

    const {
      dispatch,
      company: { offers },
      match: {
        params: { userId }
      }
    } = this.props

    const offer = find(propEq('id', offerId))(offers)
    offer.status = status
    offer.company = userId
    dispatch(updateOffer(offer, offer.id))
  }
  

  searchProfessionalsBySkills = e => {

    const { currentWeek } = this.state

    const {
      match: {
        params: { userId }
      },
      dispatch,
      company: { profile },
      formValues
    } = this.props

    const { searchForm } = formValues
    const { postalCode } = profile

    const skill = find(propEq('id', prop('skill', searchForm)))(skills)
    const skillName = defaultTo('allSkills', prop('name', skill))

    const results = mapIndexed((v, index) => {
      return map(key => last(split('t', key)), keys(pickBy((value, key) => value === true, prop(`day${index}`, searchForm))))
    }, currentWeek)

    const values = { skill: skillName, postalCode, userId }

    values.data = mapIndexed((result, i) => {
      const value = {}
      value.date = currentWeek[i]
      value.shifts = map(value => prop('name', find(propEq('id', parseInt(value)))(shifts)), result)
      return value
    }, results)

    dispatch(searchProfessionals(userId, values))

    const skillInputValue = skillName === 'allSkills' ?  `(All Skills)` : `(${skillName})`

    this.setState({
      searchInputValue: `${head(currentWeek)} - ${last(currentWeek)} ${skillInputValue}` 
    })

    this.hideSearchDrawer()
  } 

  charityStatusChange = () => {
   
    const {
      dispatch,
      formValues: { charity }
    } = this.props

    dispatch(change('company', 'charity', not(charity)))
  }

  getPaymentClientToken = event => {
    const {
      dispatch,
      match: {
        params: { userId }
      },
      company: { stripeSecret }
    } = this.props,
      type = event.target.value

    dispatch(change('company', 'paymentMethod', type))
  
    if(equals(type, 'Pay with Card')){
      if(isEmptyOrNull(stripeSecret)){
        dispatch(getStripeSecret(userId))
      }
    }
    
  }

  showEditFormModal = (name) => {

    this.setState({
      editFormModal: true,
      formName: name
    })

  }

  hideEditFormModal = () => {
    this.setState({
      editFormModal: false,
      formName: ''
    })
  }

  subsidiaryStatusChange = () => {
    
    const {
      dispatch,
      formValues: { subsidiary }
    } = this.props

    dispatch(change('company', 'subsidiary', not(subsidiary)))
  }

  findAddresses = () => {
    
    const {
      dispatch,
      formValues: { postalCode }
    } = this.props

    dispatch(getAdresses(trim(postalCode)))

  }

  skipPaymentOption = () => {
    this.setState({ paymentSkipped: true })
  }

  showPaymentForm = () => {
    this.setState({ paymentSkipped: false })
  }

  addressSelectHandler = addressId => {

    const {
      dispatch,
      addresses: { addresses }
    } = this.props

    if(!isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('company', 'address', concat(address[0], address[1])))
      dispatch(change('company', 'city', address[5]))
      dispatch(change('company', 'county', address[6]))
    }
  }

  changeRequestType = (values, options)=> {

    this.setState({
      requestTypes: values,
      indeterminate: and(length(values), length(values) <  length(options)),
      allRequests: equals(length(values), length(options))
    })
  }

  changeAllRequestTypes = (e, options = []) => {

    const checked = e.target.checked

    this.setState({
      requestTypes: checked ? map(option => prop('value', option), options) : [],
      indeterminate: false,
      allRequests: checked
    })
  }
  
  render() {
    const {
      paymentSkipped,
      formName,
      pageKey,
      editFormModal,
      searchDrawer,
      currentWeek,
      searchInputValue,
      offerModal,
      offerFormShifts,
      requestTypes,
      indeterminate,
      allRequests,
    } = this.state

    const {
      invalid,
      addresses,
      company: {
        offers,
        profile,
        isLoading,
        professionals,
        stripeSecret,
        paypalSecret
      },
      application: {
        authentication: { userId }
      },
      formValues
    } = this.props

    const { firstName, isPaid = false } = defaultTo({}, profile),
      paymentDone = or(isPaid, paymentSkipped),
      perfectProfile = and(not(isEmptyOrNull(firstName)), paymentDone)
    
    return(
      <>
        <Header
          clickHandler={this.logout}
          perfectProfile={perfectProfile}
        />
        <Loader
          size="large"
          isLoading={isLoading}
          loadingText={'Loading...'}
          wrapper={
            <Container
              userId={userId}
              profile={profile}
              pageKey={pageKey}
              formInvalid={invalid}
              addresses={addresses}
              formValues={formValues}
              paymentSkipped={paymentSkipped}
              stripeSecret={stripeSecret}
              offers={offers}
              offerModal={offerModal}
              professionals={professionals}
              currentWeek={currentWeek}
              searchDrawer={searchDrawer}
              searchInputValue={searchInputValue}
              allRequests={allRequests}
              indeterminate={indeterminate}
              requestTypes={requestTypes}
              formName={formName}
              offerFormShifts={offerFormShifts}
              formModal={editFormModal}
              paypalSecret={paypalSecret}
              adBlockerExists={detected()}
              resetWeek={this.resetWeek}
              submitOfferRequest={this.submitOfferRequest}
              showOfferModal={this.showOfferModal}
              hideOfferModal={this.hideOfferModal}
              skipCurrentWeek={this.skipCurrentWeek}
              changeAllRequestTypes={this.changeAllRequestTypes}
              changeRequestType={this.changeRequestType}
              hideEditFormModal={this.hideEditFormModal}
              changePassword={this.changePassword}
              findAddresses={this.findAddresses}
              saveDetails={this.saveDetails}
              updateCompany={this.updateCompany}
              showEditFormModal={this.showEditFormModal}
              initProcess={this.initProcess}
              searchProfessionalsBySkills={this.searchProfessionalsBySkills}
              sendMessage={this.sendMessage}
              showSearchDrawer={this.showSearchDrawer}
              hideSearchDrawer={this.hideSearchDrawer}
              updateOfferStatus={this.updateOfferStatus}
              finishProcess={this.finishProcess}
              showPaymentForm={this.showPaymentForm}
              requestPaypalPayment={this.requestPaypalPayment}
              getPaymentClientToken={this.getPaymentClientToken}
              skipPaymentOption={this.skipPaymentOption}
              changePostalCode={this.changePostalCode}
              makePaymentRequest={this.makePaymentRequest}
              subsidiaryStatusChange={this.subsidiaryStatusChange}
              charityStatusChange={this.charityStatusChange}
              addressSelectHandler={this.addressSelectHandler}
            />
          }
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    formValues: getFormValues('company')(state),
    company: state.company,
    addresses: state.addresses,
    application: state.account
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'company',
    initialValues: getCompanyFormValues()
  })(Company)
)