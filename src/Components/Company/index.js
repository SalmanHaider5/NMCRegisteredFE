import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { Icon } from 'antd'
import { concat, omit, trim, find, propEq, split, prop, defaultTo, last, equals } from 'ramda'
import { addDetails, logoutUser, getCompanyDetails, getAdresses, updatePassword, contactUs, makePayment, updateProfile, searchProfessionals, getClientPaymentToken } from '../../actions'
import { QUALIFICATION_OPTIONS as skills, TIMESHEET_SHIFTS as shifts } from '../../constants'
import { getCompanyFormValues, isEmptyOrNull } from '../../utils/helpers'
import AddDetails from './AddDetails'
import ViewDetails from './ViewDetails'
import Header from '../Header'

import './company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      charityStatus: false,
      subsidiary: false,
      paymentSkipped: false,
      paymentMethod: '',
      collapsed: false,
      formName: '',
      editFormModal: false,
      documentModal: false,
      documentModalType: '',
      imageModal: false
    };
  }

  componentDidMount(){
    const { match: { params: { userId } }, dispatch, company: { companyDetails: { isPaid = false } }, application: { authentication: { auth, role } }, history } = this.props
    dispatch(getCompanyDetails(userId))
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

  makePaymentRequest = (response) => {
    const { dispatch, match: { params: { userId } } } = this.props
    dispatch(makePayment(userId, response))
  }

  sendMessage = () => {
    const { dispatch, formValues: { contactForm } } = this.props
    const { subject } = contactForm
    contactForm.subject = `${subject} [Contact Form | Company]`
    dispatch(contactUs(contactForm))
  }
  updateCompany = () => {
    const { formValues, dispatch, match: { params: { userId } } } = this.props
    const values = omit(['contactForm', 'searchForm', 'changePassword', 'email', 'isVerified'], formValues)
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

  searchProfessionalsBySkills = shift => {
    const { match: { params: { userId } }, dispatch, company: { companyDetails }, formValues } = this.props
    const { searchForm: { skill, searchDate } } = formValues
    const values = {}
    values.skill = prop('name', find(propEq('id', skill))(skills))
    values.shift = prop('name', find(propEq('id', shift))(shifts))
    values.postalCode = prop('postalCode', companyDetails)
    values.date = moment(moment.utc(searchDate).toISOString()).format('YYYY-DD-MM').toString()
    dispatch(searchProfessionals(userId, values))
  } 

  charityStatusChange = () => {
    const { charityStatus } = this.state
    this.setState({ charityStatus: !charityStatus })
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
    const { subsidiary } = this.state
    this.setState({ subsidiary: !subsidiary })
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
        return `Personal Details`
      default:
        return `Professional Details`
    }
  }
  
  render() {
    const { current, charityStatus, subsidiary, paymentSkipped, collapsed, formName, editFormModal, documentModal, documentModalType, imageModal } = this.state
    const { invalid, addresses, company: { companyDetails, isLoading, professionals, secret }, application: { authentication: { userId } }, formValues } = this.props
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
            charityStatus={charityStatus}
            subsidiary={subsidiary}
            professionals={professionals}
            documentModal={documentModal}
            documentModalType={documentModalType}
            imageModal={imageModal}
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
            onCollapse={this.onCollapse}
            changePassword={this.changePassword}
            sendMessage={this.sendMessage}
            updateCompany={this.updateCompany}
            searchProfessionalsBySkills={this.searchProfessionalsBySkills}
          /> 
          :
          <AddDetails
            current={current}
            charityStatus={charityStatus}
            subsidiary={subsidiary}
            invalid={invalid}
            isLoading={isLoading}
            addresses={addresses}
            paymentSkipped={paymentSkipped}
            companyDetails={companyDetails}
            formValues={formValues}
            secret={secret}
            makePaymentRequest={this.makePaymentRequest}
            next={this.next}  
            prev={this.prev}
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