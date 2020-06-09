import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { detected } from 'adblockdetect'
import { Icon, message } from 'antd'
import { concat, omit, trim, find, propEq, split, prop, defaultTo, last, equals, head, append, length } from 'ramda'
import { addDetails, logoutUser, getCompanyDetails, clearAddresses, getAdresses, updatePassword, contactUs, makePayment, makePaypalPayment, updateProfile, searchProfessionals, getClientPaymentToken } from '../../actions'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../constants'
import { getCompanyFormValues, isEmptyOrNull } from '../../utils/helpers'
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
      paypalPayment: false
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
    if(last(split('/', pathname)) === 'profile'){
      this.setState({ pageKey: '2' })
    }
    if(last(split('/', pathname)) === 'changePassword'){
      this.setState({ pageKey: '3' })
    }
    if(last(split('/', pathname)) === 'contact'){
      this.setState({ pageKey: '4' })
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

  changePassword = () => {
    const { dispatch, formValues, match: { params: { userId } } } = this.props
    const { changePassword } = formValues
    const values = omit(['confirmPassword'], changePassword)
    dispatch(updatePassword(userId, values))
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
    const { match: { params: { userId } }, dispatch, company: { companyDetails }, formValues } = this.props
    const { searchForm } = formValues
    const { skill, searchDate } = searchForm
    const shift = e.target.value
    searchForm.shift = shift
    dispatch(change('company', 'searchForm', searchForm))
    const values = {}
    values.skill = prop('name', find(propEq('id', skill))(skills))
    values.shift = prop('name', find(propEq('id', shift))(shifts))
    values.postalCode = prop('postalCode', companyDetails)
    values.date = searchDate
    dispatch(searchProfessionals(userId, values))
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

  showMessage = (type, value) => {
    const { dispatch, formValues: { searchForm: { searchDate } } } = this.props
    const { datePickerType } = this.state
    if(type === 'skill'){
      const searchForm = {
        skill: value,
        searchDate,
        shift: ''
      }
      dispatch(change('company', 'searchForm', searchForm))
      message.success('Pick a Date')
    }
    if(type === 'date'){
      if(datePickerType === 'singular'){
        if(moment(value).isSameOrAfter(moment())){
          const { formValues: { searchForm: { skill } } } = this.props
          const searchForm = {
            skill,
            searchDate: [moment(value).format('YYYY-MM-DD')],
            shift: ''
          }
          dispatch(change('company', 'searchForm', searchForm))
          message.success('Choose a Shift')
          this.setState({ searchDateError: '' })
        }else{
          this.setState({ searchDateError: '* Previous date cannot be selected' })
        }
      }else{
        if(moment(head(value)).isSameOrAfter(moment())){
          const { formValues: { searchForm: { skill } } } = this.props
          const searchDates = this.extractDates(moment(head(value)), moment(last(value)))
          if(length(searchDates) > 7){
            this.setState({ searchDateError: '* You can select upto 7 days' })
          }else{
            const searchForm = {
              skill,
              searchDate: searchDates,
              shift: ''
            }
            dispatch(change('company', 'searchForm', searchForm))
            message.success('Choose a Shift')
            this.setState({ searchDateError: '' })
          }
        }else{
          this.setState({ searchDateError: '* Previous date cannot be selected' })
        }
      }
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
  
  render() {
    const { current, paymentSkipped, collapsed, formName, editFormModal, documentModal, searchDateError, pageKey, documentModalType, imageModal, datePickerType, adBlockerExists, paypalPayment } = this.state
    const { invalid, addresses, company: { companyDetails, isLoading, professionals, secret, paypalToken }, application: { authentication: { userId } }, formValues } = this.props
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
            paypalPayment={paypalPayment}
            makePaypalPayment={this.makePaypalPayment}
            makePaymentRequest={this.makePaymentRequest}
            next={this.next}  
            prev={this.prev}
            changePostalCode={this.changePostalCode}
            getFormIcon={this.getFormIcon}
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