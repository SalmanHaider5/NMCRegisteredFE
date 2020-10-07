import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { detected } from 'adblockdetect'
import { Icon, message } from 'antd'
import { concat, omit, trim, find, propEq, split, prop, defaultTo, head, last, equals, append, range, map, pickBy, keys, length } from 'ramda'
import { addDetails, logoutUser, getCompanyDetails, clearAddresses, getAdresses, updatePassword, contactUs, makePayment, makePaypalPayment, updateProfile, searchProfessionals, getClientPaymentToken, sendOfferRequest } from '../../actions'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../constants'
import { getCompanyFormValues, isEmptyOrNull, mapIndexed } from '../../utils/helpers'
import AddDetails from './AddDetails'
import ViewDetails from './ViewDetails'
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
      adBlockerExists: false,
      paypalPayment: false,
      termsDrawer: false,
      searchDrawer: false,
      week: 1,
      currentWeek: [],
      searchInputValue: '',
      offerModal: false,
      offerFormShifts: [],
      professionalId: '',
      requestTypes: ['accepted'],
      indeterminate: true,
      allRequests: false
    };
  }

  componentDidMount(){
    const { match: { params: { userId } }, dispatch, company: { companyDetails: { isPaid = false } }, application: { authentication: { auth, role } }, history, location: { pathname } } = this.props
    dispatch(getCompanyDetails(userId))
    this.setState({
      adBlockerExists: detected()
    })
    if(last(split('/', pathname)) === 'professionals'){
      this.setState({ pageKey: '1' })
    }
    if(last(split('/', pathname)) === 'requests'){
      this.setState({ pageKey: '2' })
    }
    if(last(split('/', pathname)) === 'profile'){
      this.setState({ pageKey: '3' })
    }
    if(last(split('/', pathname)) === 'changePassword'){
      this.setState({ pageKey: '4' })
    }
    if(last(split('/', pathname)) === 'contact'){
      this.setState({ pageKey: '5' })
    }
    if(!auth && role !== 'company'){
      history.push('/')
    }else if(!isPaid){
      dispatch(getClientPaymentToken())
    }
  }
  
  next = () => {
    const { current } = this.state
    this.setState({ current: current + 1 })
  }

  prev = () => {
    const { current } = this.state
    this.setState({ current: current - 1 })
  }

  onCollapse = () => {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  showOfferModal = (selectedProfessional) => {
    const { company: { professionals } } = this.props
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
    const { formValues: { offerForm }, match: { params: { userId } }, dispatch } = this.props
    const { shifts } = offerForm
    const { professionalId } = this.state
    offerForm.shifts = shifts.toString()
    offerForm.company = userId
    offerForm.professional = professionalId.toString()
    dispatch(sendOfferRequest(offerForm))
    this.hideOfferModal()
  }

  hideOfferModal = () => {
    this.setState({
      offerModal: false,
      professionalId: ''
    })
  }

  showTermsDrawer = () => {
    this.setState({ termsDrawer: true })
  }

  hideTermsDrawer = () => {
    this.setState({ termsDrawer: false })
  }

  changePassword = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
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
    this.showMessage('skill')
    this.setState({
      currentWeek: weeklyDates,
      searchDrawer: true
    })
  }

  skipCurrentWeek = () => {
    const { dispatch } = this.props
    const { week } = this.state
    const shiftsForm = {
      shift1: false,
      shift2: false,
      shift3: false,
      shift4: false,
      shift5: false
    }
    
    const searchForm = {
      skill: '',
      day0: shiftsForm,
      day1: shiftsForm,
      day2: shiftsForm,
      day3: shiftsForm,
      day4: shiftsForm,
      day5: shiftsForm,
      day6: shiftsForm
    } 
    dispatch(change('company', 'searchForm', searchForm))
    this.setState({ week: week + 1 }, () => {
      this.showSearchDrawer()
    })
  }

  resetWeek = () => {
    const { dispatch } = this.props
    const shiftsForm = {
      shift1: false,
      shift2: false,
      shift3: false,
      shift4: false,
      shift5: false
    }
    
    const searchForm = {
      skill: '',
      day0: shiftsForm,
      day1: shiftsForm,
      day2: shiftsForm,
      day3: shiftsForm,
      day4: shiftsForm,
      day5: shiftsForm,
      day6: shiftsForm
    } 
    dispatch(change('company', 'searchForm', searchForm))
    this.setState({ week: 1 }, () => {
      this.showSearchDrawer()
    })
  }

  hideSearchDrawer = () => {
    this.setState({ searchDrawer: false })
  }

  makePaypalPayment = (response) => {
    const { dispatch, match: { params: { userId } } } = this.props
    dispatch(makePaypalPayment(userId, response))
  }

  makePaymentRequest = (response) => {
    const { dispatch, match: { params: { userId } } } = this.props
    dispatch(makePayment(userId, response))
  }

  changeDatePickerType = () => {
    const { datePickerType } = this.state
    this.setState({
      datePickerType: datePickerType === 'singular' ? 'multiple' : 'singular'
    })
  }

  sendMessage = () => {
    const { dispatch, formValues: { contactForm } } = this.props
    const { subject } = contactForm
    contactForm.subject = `${subject} [Contact Form | Company]`
    dispatch(contactUs(contactForm))
  }

  switchPage = key => {
    this.setState({ pageKey: key })
  }

  changePostalCode = () => {
    const { dispatch } = this.props
    dispatch(change('company', 'postalCode', ''))
    dispatch(clearAddresses())
  }

  updateCompany = () => {
    const { formValues, dispatch, match: { params: { userId } } } = this.props
    const values = omit(['contactForm', 'searchForm', 'changePassword', 'email', 'isVerified'], formValues)
    if(!values.subsidiary){
      values.subsidiaryName = ''
      values.subsidiaryAddress = ''
      dispatch(change('company', 'subsidiaryName', ''))
      dispatch(change('company', 'subsidiaryAddress', ''))
    }
    if(!values.charity){
      values.charityReg = ''
      dispatch(change('company', 'charityReg', ''))
    }
    dispatch(updateProfile(userId, values))
    this.hideEditFormModal()
  }

  showImageModal = () => {
    this.setState({ imageModal: true })
  }

  hideImageModal = () => {
    this.setState({ imageModal: false })
  }

  saveDetails = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
    const values = omit(['changePassword', 'contactForm', 'searchForm'], formValues)
    if(!values.subsidiary){
      values.subsidiaryName = ''
      values.subsidiaryAddress = ''
      dispatch(change('company', 'subsidiaryName', ''))
      dispatch(change('company', 'subsidiaryAddress', ''))
    }
    if(!values.charity){
      values.charityReg = ''
      dispatch(change('company', 'charityReg', ''))
    }
    dispatch(addDetails(userId, values))
    dispatch(reset('company'))
    this.setState({ current: 0 })
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'company'){
      history.push('/')
    }
  }

  searchProfessionalsBySkills = e => {
    const { currentWeek } = this.state
    const { match: { params: { userId } }, dispatch, company: { companyDetails }, formValues } = this.props
    const { searchForm } = formValues
    const skillName = defaultTo('allSkills', prop('name', find(propEq('id', prop('skill', searchForm)))(skills)))
    const results = mapIndexed((v, index) =>{
      return map(key => last(split('t', key)), keys(pickBy((value, key) => value === true, prop(`day${index}`, searchForm))))
    }, currentWeek)
    const values = mapIndexed((result, i) => {
      const value = {}
      value.skill = skillName
      value.postalCode = prop('postalCode', companyDetails)
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
    const { dispatch, formValues: { charity } } = this.props
    dispatch(change('company', 'charity', !charity))
  }

  showEditFormModal = (name) => {
    this.setState({
      editFormModal: true,
      formName: name
    })
  }

  showDocumentModal = type => {
    this.setState({
      documentModal: true,
      documentModalType: type
    })
  }

  hideDocumentModal = () => {
    this.setState({
      documentModal: false,
      documentModalType: ''
    })
  }

  hideEditFormModal = () => {
    this.setState({
      editFormModal: false,
      formName: ''
    })
  }

  logout = () => {
    const { dispatch, history } = this.props
    dispatch(logoutUser())
    history.push('/')
  }

  subsidiaryStatusChange = () => {
    const { dispatch, formValues: { subsidiary } } = this.props
    dispatch(change('company', 'subsidiary', !subsidiary))
  }

  findAddresses = () => {
    const { dispatch, formValues: { postalCode } } = this.props
    dispatch(getAdresses(trim(postalCode)))
  }

  getDocumentType = document => {
    const extension = last(split('.', document))
    if(equals(extension, 'pdf') || equals(extension, 'doc') || equals(extension, 'docs'))
      return 'document'
    else if(equals(extension, 'jpg') || equals(extension, 'jpeg') || equals(extension, 'png'))
      return 'image'
  }

  skipPaymentOption = () => {
    this.setState({ paymentSkipped: true })
  }

  showPaymentForm = () => {
    this.setState({ paymentSkipped: false })
  }

  changePaymentMethod = e => {
    this.setState({ paymentMethod: e.target.value })
  }

  addressSelectHandler = addressId => {
    const { dispatch, addresses: { addresses } } = this.props
    if(!isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('company', 'address', concat(address[0], address[1])))
      dispatch(change('company', 'city', address[5]))
      dispatch(change('company', 'county', address[6]))
    }
  }

  extractDates = (startDate, endDate) => {
    let dates = [];
    while(!moment(startDate).isAfter(moment(endDate))){
      dates = append(moment(startDate).format('YYYY-MM-DD'), dates)
      startDate = startDate.add(1, 'days')
    }
    return dates
  }

  showMessage = (type) => {
    const { dispatch } = this.props
    if(type === 'skill'){
      const shiftsForm = {
        shift1: false,
        shift2: false,
        shift3: false,
        shift4: false,
        shift5: false
      }
      
      const searchForm = {
        skill: '',
        day0: shiftsForm,
        day1: shiftsForm,
        day2: shiftsForm,
        day3: shiftsForm,
        day4: shiftsForm,
        day5: shiftsForm,
        day6: shiftsForm
      }
      dispatch(change('company', 'searchForm', searchForm))
      message.success('Pick a Week and Select Shifts')
    }
  }

  getFormIcon = (id, className) => {
    switch(id){
      case 0:
        return <Icon type="user" className={className} />
      case 1:
        return <Icon type="environment" className={className} />
      default:
        return <Icon type="highlight" className={className} />
    }
  }

  getFormName = current => {
    switch(current){
      case 0:
        return `Basic Details`
      default:
        return `Company Details`
    }
  }

  changeRequestType = (values, options)=> {
    this.setState({
      requestTypes: values,
      indeterminate: !!length(values) && length(values) <  length(options),
      allRequests: length(values) === length(options)
    })
  }

  changeAllRequestTypes = (e, options) => {
    this.setState({
      requestTypes: e.target.checked ? map(option => prop('value', option), options) : [],
      indeterminate: false,
      allRequests: e.target.checked
    })
  }
  
  render() {
    const { current, paymentSkipped, collapsed, formName, editFormModal, documentModal, searchDateError, pageKey, documentModalType, imageModal, datePickerType, adBlockerExists, paypalPayment, termsDrawer, searchDrawer, week, currentWeek, searchInputValue, offerModal, offerFormShifts, requestTypes, indeterminate, allRequests } = this.state
    const { invalid, addresses, company: { offers, companyDetails, isLoading, professionals, secret, paypalToken }, application: { authentication: { userId } }, formValues } = this.props
    const isPaid = defaultTo(false, prop('isPaid', companyDetails))
    
    return(
      <div>
        <Header
          logout={this.logout}
        />
        {
          !isEmptyOrNull(prop('firstName', companyDetails)) && (isPaid || paymentSkipped) ?
          <ViewDetails
            collapsed={collapsed}
            userId={userId}
            formValues={formValues}
            isPaid={isPaid}
            isLoading={isLoading}
            company={companyDetails}
            formName={formName}
            editFormModal={editFormModal}
            addresses={addresses}
            professionals={professionals}
            documentModal={documentModal}
            documentModalType={documentModalType}
            imageModal={imageModal}
            searchDateError={searchDateError}
            pageKey={pageKey}
            datePickerType={datePickerType}
            searchDrawer={searchDrawer}
            week={week}
            offers={offers}
            searchInputValue={searchInputValue}
            currentWeek={currentWeek}
            offerModal={offerModal}
            offerFormShifts={offerFormShifts}
            requestTypes={requestTypes}
            indeterminate={indeterminate}
            allRequests={allRequests}
            showOfferModal={this.showOfferModal}
            hideOfferModal={this.hideOfferModal}
            skipCurrentWeek={this.skipCurrentWeek}
            resetWeek={this.resetWeek}
            showSearchDrawer={this.showSearchDrawer}
            hideSearchDrawer={this.hideSearchDrawer}
            changeDatePickerType={this.changeDatePickerType}
            changePostalCode={this.changePostalCode}
            showImageModal={this.showImageModal}
            hideImageModal={this.hideImageModal}
            showDocumentModal={this.showDocumentModal}
            hideDocumentModal={this.hideDocumentModal}
            findAddresses={this.findAddresses}
            getDocumentType={this.getDocumentType}
            addressSelectHandler={this.addressSelectHandler}
            showEditFormModal={this.showEditFormModal}
            hideEditFormModal={this.hideEditFormModal}
            charityStatusChange={this.charityStatusChange}
            subsidiaryStatusChange={this.subsidiaryStatusChange}
            showMessage={this.showMessage}
            onCollapse={this.onCollapse}
            changePassword={this.changePassword}
            sendMessage={this.sendMessage}
            updateCompany={this.updateCompany}
            switchPage={this.switchPage}
            showPaymentForm={this.showPaymentForm}
            searchProfessionalsBySkills={this.searchProfessionalsBySkills}
            submitOfferRequest={this.submitOfferRequest}
            changeRequestType={this.changeRequestType}
            changeAllRequestTypes={this.changeAllRequestTypes}
          /> 
          :
          <AddDetails
            current={current}
            invalid={invalid}
            isLoading={isLoading}
            addresses={addresses}
            paymentSkipped={paymentSkipped}
            companyDetails={companyDetails}
            formValues={formValues}
            secret={secret}
            paypalToken={paypalToken}
            adBlockerExists={adBlockerExists}
            termsDrawer={termsDrawer}
            paypalPayment={paypalPayment}
            makePaypalPayment={this.makePaypalPayment}
            makePaymentRequest={this.makePaymentRequest}
            next={this.next}  
            prev={this.prev}
            changePostalCode={this.changePostalCode}
            getFormIcon={this.getFormIcon}
            showTermsDrawer={this.showTermsDrawer}
            hideTermsDrawer={this.hideTermsDrawer}
            getFormName={this.getFormName}
            findAddresses={this.findAddresses}
            addressSelectHandler={this.addressSelectHandler}
            charityStatusChange={this.charityStatusChange}
            subsidiaryStatusChange={this.subsidiaryStatusChange}
            saveDetails={this.saveDetails}
            skipPaymentOption={this.skipPaymentOption}
          />
        }
      </div>
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