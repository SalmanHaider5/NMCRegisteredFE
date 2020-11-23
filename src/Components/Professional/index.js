import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { reduxForm, getFormValues, reset, change } from 'redux-form'
import moment from 'moment'
import { Icon, Spin } from 'antd'
import { trim, split, prop, propEq, concat, find, omit, dissoc, type, last, equals } from 'ramda'
import { getAdresses, createDetails, addPhone, verifyPhone, logoutUser, getProfessionalDetails, updateProfessionalProfile, updateSecurityDetails, changePhoneRequest, clearAddresses, contactUs, addBankDetails, updateBankDetails, changeOfferStatus } from '../../actions'
import { GENDER_OPTIONS as genders, QUALIFICATION_OPTIONS as qualifications } from '../../constants'
import { getProfessionalFormValues, isEmptyOrNull } from '../../utils/helpers'
import Header from '../Header'
import AddDetails from './AddDetails'
import ViewDetails from './ViewDetails'

class Professional extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      formModal: false,
      formName: '',
      current: 0,
      imageModal: false,
      documentFile: '',
      imageFile: '',
      crbFile: '',
      documentModalType: '',
      documentModal: false,
      pageKey: 0
    };
  }

  componentDidMount(){
    const { application: { authentication: { auth, role } }, history, dispatch, match: { params: { userId } }, location: { pathname } } = this.props
    dispatch(getProfessionalDetails(userId))
    if(last(split('/', pathname)) === 'timesheet'){
      this.setState({ pageKey: '1' })
    }
    if(last(split('/', pathname)) === 'requests'){
      this.setState({ pageKey: '2' })
    }
    if(last(split('/', pathname)) === 'profile'){
      this.setState({ pageKey: '3' })
    }
    if(last(split('/', pathname)) === 'security'){
      this.setState({ pageKey: '4' })
    }
    if(last(split('/', pathname)) === 'contact'){
      this.setState({ pageKey: '5' })
    }
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  switchPage = key => {
    this.setState({ pageKey: key })
  }

  updateOfferStatus = (offerId, status) => {
    const { dispatch, professional: { professionalDetails: { offers } }, match: { params: { userId } } } = this.props
    const offer = find(propEq('id', offerId))(offers)
    offer.status = status
    offer.professional = userId
    dispatch(changeOfferStatus(offer, offer.id))
  }
  
  updateProfessionalDetails = () => {
    const { match: { params: { userId } }, dispatch, formValues } = this.props
    const { status, dateOfBirth, qualification } = formValues
    let values = formValues
    if(type(status) === 'String')
      values.status = status
    else
      values.status = prop('name', find(propEq('id', status))(genders))
    if(type(qualification) === 'String')
      values.qualification = qualification
    else
      values.qualification = prop('name', find(propEq('id', qualification))(qualifications))
    
    values.dateOfBirth = dateOfBirth
    dispatch(updateProfessionalProfile(userId, values))
    this.setState({
      imageFile: '',
      documentFile: ''
    })
    this.hideEditFormModal()
  }

  updateSecurityandLoginDetails = () => {
    const { formValues: { changePassword }, dispatch, match: { params: { userId } } } = this.props
    const values = dissoc('confirmPassword', changePassword)
    dispatch(updateSecurityDetails(userId, values))
  }

  showImageModal = () => {
    this.setState({ imageModal: true })
  }
  hideImageModal = () => {
    this.setState({ imageModal: false })
  }

  sendVerificationCode = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
  }

  next = () => {
    const { current } = this.state
    this.setState({
      current: current + 1
    })
  }

  showDocumentModal = type => {
    this.setState({
      documentModal: true,
      documentModalType: type
    })
  }

  dateHandler = value => {
    const { dispatch } = this.props
    dispatch(change('professional', 'dateOfBirth', moment(value).format('YYYY-MM-DD')))
  }

  hideDocumentModal = () => {
    this.setState({
      documentModal: false,
      documentModalType: ''
    })
  }

  prev = () => {
    const { current } = this.state
    this.setState({
      current: current - 1
    })
  }

  showEditFormModal = (name) => {
    this.setState({
      formModal: true,
      formName: name
    })
  }

  hideEditFormModal = () => {
    const { documentFile, imageFile, crbFile } = this.state
    const { dispatch, professional: { professionalDetails } } = this.props
    const { document, profilePicture, crbDocument } = professionalDetails
    this.setState({
      formModal: false,
      formName: ''
    })

    if(!isEmptyOrNull(documentFile)){
      dispatch(change('professional', 'document', documentFile))
    }else{
      dispatch(change('professional', 'document', document))
    }
    if(!isEmptyOrNull(imageFile)){
      dispatch(change('professional', 'profilePicture', imageFile))
    }else{
      dispatch(change('professional', 'profilePicture', profilePicture))
    }
    if(!isEmptyOrNull(crbFile)){
      dispatch(change('professional', 'crbDocument', crbFile))
    }else{
      dispatch(change('professional', 'crbDocument', crbDocument))
    }
  }

  saveDetails = () => {
    const { dispatch, match: { params: { userId } }, formValues, history } = this.props
    const { status, qualification, dateOfBirth } = formValues
    const values = omit(['status', 'phone', 'postalCode', 'changePassword', 'addressId'], formValues)
    values.status = prop('name', find(propEq('id', status))(genders))
    values.qualification = prop('name', find(propEq('id', qualification))(qualifications))
    values.dateOfBirth = dateOfBirth
    dispatch(createDetails(userId, values))
    dispatch(reset('professional'))
    history.push(`/professional/${userId}/timesheet`)
  }

  logout = () => {
    const { dispatch, application: { auth, role }, history } = this.props
    dispatch(logoutUser())
    if(!auth && role !== 'professional'){
      history.push('/')
    }
  }

  changePostalCode = () => {
    const { dispatch } = this.props
    dispatch(change('professional', 'postCode', ''))
    dispatch(clearAddresses())
  }

  getProfileStatus = id => {
    return prop('name', find(propEq('id', id))(genders))
  }

  findAddresses = () => {
    const { dispatch, formValues: { postCode } } = this.props
    dispatch(getAdresses(trim(postCode)))
  }

  addressSelectHandler = addressId => {
    const { dispatch, addresses: { addresses } } = this.props
    if(!isEmptyOrNull(addressId)){
      const address = split(',', prop('name', find(propEq('id', addressId))(addresses)))
      dispatch(change('professional', 'address', concat(address[0], address[1])))
      dispatch(change('professional', 'city', address[5]))
      dispatch(change('professional', 'county', address[6]))
    }
  }

  verifyProfessionalPhone = () => {
    const { formValues: { phoneCode }, dispatch, match: { params: { userId } } } = this.props
    const values = {}
    values.code = phoneCode
    dispatch(verifyPhone(userId, values))
    dispatch(reset('professional'))
  }

  hideVerificationModal = () => {
    const { formValues: { phone }, match: { params: { userId } }, dispatch } = this.props
    const values = {}
    values.phone = phone
    dispatch(addPhone(userId, values))
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

  editPhoneNumber = () => {
    const { dispatch } = this.props
    dispatch(change('professional', 'phone', ''))
    dispatch(changePhoneRequest())
  }

  getFormName = current => {
    switch(current){
      case 0:
        return `Personal Details`
      case 1:
        return `Address Details`
      default:
        return `Work Experience`
    }
  }

  onCollapse = () => {
    const { collapsed } = this.state
    this.setState({ collapsed: !collapsed })
  }

  fileRemoveHandler = () => {
    const { dispatch, formValues: { document } } = this.props
    this.setState({ documentFile: document })
    dispatch(change('professional', 'document', ''))
  }

  imageRemoveHandler = () => {
    const { dispatch, formValues: { profilePicture } } = this.props
    this.setState({ imageFile: profilePicture })
    dispatch(change('professional', 'profilePicture', ''))
  }

  crbRemoveHandler = () => {
    const { dispatch, formValues: { crbDocument } } = this.props
    this.setState({ crbFile: crbDocument })
    dispatch(change('professional', 'crbDocument', ''))
  }

  getDocumentType = document => {
    const extension = last(split('.', document))
    if(equals(extension, 'pdf') || equals(extension, 'doc') || equals(extension, 'docs'))
      return 'document'
    else if(equals(extension, 'jpg') || equals(extension, 'jpeg') || equals(extension, 'png'))
      return 'image'
  }

  saveBankDetails = () => {
    const { formValues: { bankDetails }, dispatch, match: { params: { userId } } } = this.props
    dispatch(addBankDetails(userId, bankDetails))
  }

  modifyBankDetails = () => {
    const { formValues: { bankDetails }, dispatch, match: { params: { userId } } } = this.props
    dispatch(updateBankDetails(userId, bankDetails))
    this.hideEditFormModal()
  }

  sendMessage = () => {
    const { dispatch, formValues: { contactForm } } = this.props
    const { subject } = contactForm
    contactForm.subject = `${subject} [Contact Form | Professional]`
    dispatch(contactUs(contactForm))
  }

  render() {
    const { collapsed, formModal, formName, current, imageModal, documentModalType, documentModal, pageKey } = this.state
    const {
      addresses,
      invalid,
      formValues,
      professional: {
        isLoading,
        professionalDetails,
        phoneVerified,
        codeSent
      },
      match: {
        params: {
          userId
        }
      },
      application: {
        authentication: {
          auth
        }
      }
    } = this.props

    const { bankDetails, offers } = professionalDetails
    
    if(!auth){
      return <Redirect to="/" />
    }
  
    return (
      <div>
        <Header
          logout={this.logout}
        />
        <Spin spinning={isLoading}>
          {
            isEmptyOrNull(prop('insurance', bankDetails)) ?
            <AddDetails
              findAddresses={this.findAddresses}
              addressSelectHandler={this.addressSelectHandler}
              addresses={addresses}
              professional={professionalDetails}
              sendVerificationCode={this.sendVerificationCode}
              verifyProfessionalPhone={this.verifyProfessionalPhone}
              phoneVerified={phoneVerified}
              current={current}
              next={this.next}
              prev={this.prev}
              getFormIcon={this.getFormIcon}
              saveDetails={this.saveDetails}
              formValues={formValues}
              fileChangeHandler={this.fileChangeHandler}
              getFormName={this.getFormName}
              invalid={invalid}
              codeSent={codeSent}
              saveBankDetails={this.saveBankDetails}
              dateHandler={this.dateHandler}
              editPhoneNumber={this.editPhoneNumber}
              fileRemoveHandler={this.fileRemoveHandler}
              imageRemoveHandler={this.imageRemoveHandler}
              crbRemoveHandler={this.crbRemoveHandler}
              changePostalCode={this.changePostalCode}
            /> :
            <ViewDetails
              userId={userId}
              isLoading={isLoading}
              collapsed={collapsed}
              onCollapse={this.onCollapse}
              professional={professionalDetails}
              formModal={formModal}
              formName={formName}
              showEditFormModal={this.showEditFormModal}
              hideEditFormModal={this.hideEditFormModal}
              findAddresses={this.findAddresses}
              addressSelectHandler={this.addressSelectHandler}
              updateProfessionalDetails={this.updateProfessionalDetails}
              addresses={addresses}
              updateOfferStatus={this.updateOfferStatus}
              dateHandler={this.dateHandler}
              getProfileStatus={this.getProfileStatus}
              invalid={invalid}
              pageKey={pageKey}
              switchPage={this.switchPage}
              updateSecurityandLoginDetails={this.updateSecurityandLoginDetails}
              formValues={formValues}
              phoneVerified={phoneVerified}
              imageModal={imageModal}
              documentModal={documentModal}
              documentModalType={documentModalType}
              addTimesheet={this.addTimesheet}
              offers={offers}
              showImageModal={this.showImageModal}
              hideImageModal={this.hideImageModal}
              fileRemoveHandler={this.fileRemoveHandler}
              imageRemoveHandler={this.imageRemoveHandler}
              crbRemoveHandler={this.crbRemoveHandler}
              showDocumentModal={this.showDocumentModal}
              hideDocumentModal={this.hideDocumentModal}
              getDocumentType={this.getDocumentType}
              modifyBankDetails={this.modifyBankDetails}
              sendMessage={this.sendMessage}
              changePostalCode={this.changePostalCode}
            />
          }
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    formValues: getFormValues('professional')(state),
    professional: state.professional,
    addresses: state.addresses,
    application: state.account
  }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'professional',
    initialValues: getProfessionalFormValues()
  })(Professional)
)
